package main

import (
	"context"
	"errors"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "embed"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/log"
	"github.com/charmbracelet/ssh"
	"github.com/charmbracelet/wish"
	"github.com/charmbracelet/wish/bubbletea"
	"github.com/charmbracelet/wish/logging"
	"github.com/muesli/termenv"
)

const (
	host = "localhost"
	port = "23234"
)

//go:embed banner.txt
var banner string

// Public keys of users
var pubKeyUsers = map[string]string{
	"AirOne01": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMqhmmRw0kTTjQgg7lZYzqz0mBLAcnu37AH2pdOlWY7W",
	// In the future pubkeys will be handled in DB
}

// Username and password of users
var userPassUsers = map[string]string{
	"admin": "admin",
	// In the future usernames and passwords will be handled in DB
}

func main() {
	s, err := wish.NewServer(
		// Listen
		wish.WithAddress(net.JoinHostPort(host, port)),

		// Host key
		wish.WithHostKeyPath(".ssh/id_ed25519"),

		// You can SSH into the server like so:
		//		ssh -o PreferredAuthentications=none -p 23234 localhost
		//		ssh -o PreferredAuthentications=password -p 23234 localhost
		//		ssh -o PreferredAuthentications=public-key -p 23234 localhost
		//		ssh -o PreferredAuthentications=keyboard-interactive -p 23234 localhost

		// Interactive auth
		// wish.WithKeyboardInteractiveAuth(func(ctx ssh.Context, challenger gossh.KeyboardInteractiveChallenge) bool {
		// 	log.Info("Using interractive dialog", "user", ctx.User(), "local-addr", ctx.LocalAddr(), "remote-addr", ctx.RemoteAddr(), "cli-ver", ctx.ClientVersion())
		// 	answers, err := challenger(
		// 		"Hi! Please login with the username and password.\nIf you don't have credentials, create them at https://ssh.0n0.sh or by ssh'ing at this address with the \"register\" username.\nIf you want more info, head to https://ssh.0n0.sh or respond blank to the following prompt ;-)", "",
		// 		[]string{
		// 			"user: ",
		// 			"pass: ",
		// 		},
		// 		[]bool{true, true},
		// 	)
		// 	if err != nil {
		// 		return false
		// 	}
		// 	// here we check for the correct answers:
		// 	return len(answers) == 2 && answers[0] == "5" && answers[1] == "vim"
		// }),

		// SSH banner
		// A banner is always shown, even before authentication.
		// wish.WithBannerHandler(func(ctx ssh.Context) string {
		// 	return fmt.Sprintf(banner, ctx.User())
		// }),

		// This will allow anyone to log in, as long as they have given an
		// ed25519 public key.
		wish.WithPublicKeyAuth(func(ctx ssh.Context, key ssh.PublicKey) bool {
			return key.Type() == "ssh-ed25519"
		}),

		// Middlewares
		wish.WithMiddleware(
			authorizeSession,
			customBubbleTeaMiddleware(),
			logging.Middleware(),
			// This middleware prints the session duration before disconnecting.
			// elapsed.Middleware(),
		),
	)
	if err != nil {
		log.Error("Could not start server", "error", err)
	}

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	log.Info("Starting SSH server", "host", host, "port", port)
	go func() {
		if err = s.ListenAndServe(); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
			log.Error("Could not start server", "error", err)
			done <- nil
		}
	}()

	<-done
	log.Info("Stopping SSH server")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer func() { cancel() }()
	if err := s.Shutdown(ctx); err != nil && !errors.Is(err, ssh.ErrServerClosed) {
		log.Error("Could not stop server", "error", err)
	}
}

func authorizeSession(next ssh.Handler) ssh.Handler {
	return func(sess ssh.Session) {
		// if the current session's user public key is one of the
		// known users, we greet them and return.
		// for name, pubkey := range pubKeyUsers {
		for _, pubkey := range pubKeyUsers {
			parsed, _, _, _, _ := ssh.ParseAuthorizedKey(
				[]byte(pubkey),
			)
			if ssh.KeysEqual(sess.PublicKey(), parsed) {
				// wish.Println(sess, fmt.Sprintf("Hey %s!", name))
				next(sess)
				return
			}
		}
		// wish.Println(sess, "Hey, I don't know who you are!")
		next(sess)
	}
}

func customBubbleTeaMiddleware() wish.Middleware {
	newProg := func(m tea.Model, opts ...tea.ProgramOption) *tea.Program {
		p := tea.NewProgram(m, opts...)
		go func() {
			for {
				<-time.After(1 * time.Second)
				p.Send(timeMsg(time.Now()))
			}
		}()
		return p
	}
	teaHandler := func(s ssh.Session) *tea.Program {
		pty, _, active := s.Pty()
		if !active {
			wish.Fatalln(s, "no active terminal, skipping")
			return nil
		}

		m := model{
			height: pty.Window.Height,
			width:  pty.Window.Width,
		}
		return newProg(m, append(bubbletea.MakeOptions(s), tea.WithAltScreen())...)
	}
	return bubbletea.MiddlewareWithProgramHandler(teaHandler, termenv.ANSI256)
}

// Just a generic tea.Model to demo terminal information of ssh.
type model struct {
	height int
	width  int
	// Nothing more for now...
}

type timeMsg time.Time

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.height = msg.Height
		m.width = msg.Width
	case tea.KeyMsg:
		switch msg.String() {
		case "q", "ctrl+c":
			return m, tea.Quit
		}
	}
	return m, nil
}

var baseBgColor = lipgloss.CompleteAdaptiveColor{
	Light: lipgloss.CompleteColor{TrueColor: "#f0f3f4", ANSI256: "255", ANSI: "15"},
	Dark:  lipgloss.CompleteColor{TrueColor: "#17202a", ANSI256: "234", ANSI: "0"},
}
var cardBgColor = lipgloss.CompleteAdaptiveColor{
	Light: lipgloss.CompleteColor{TrueColor: "#d0d3d4", ANSI256: "252", ANSI: "7"},
	Dark:  lipgloss.CompleteColor{TrueColor: "#273746	", ANSI256: "236", ANSI: "8"},
}
var dangerColor = lipgloss.CompleteAdaptiveColor{
	Light: lipgloss.CompleteColor{TrueColor: "#d75f5f", ANSI256: "167", ANSI: "9"},
	Dark:  lipgloss.CompleteColor{TrueColor: "#c70039", ANSI256: "124", ANSI: "1"},
}

func (m model) View() string {
	var winBg = lipgloss.
		NewStyle().
		Background(baseBgColor).
		Align(lipgloss.Center).
		Width(m.width).
		Height(m.height - 2).
		Padding(1).
		Render("TEST")
	const winTitle = "0n0.sh SSH terminal"
	var winTitleBarX = lipgloss.
		NewStyle().
		Background(dangerColor).
		Padding(0, 1, 0, 1).
		Bold(true).
		Render("X")
	var winTitleBar = lipgloss.
		JoinHorizontal(
			lipgloss.Center,
			lipgloss.
				NewStyle().
				Background(cardBgColor).
				Height(1).
				PaddingLeft(1).
				Width(m.width-lipgloss.Width(winTitleBarX)).
				Render(winTitle),
			winTitleBarX,
		)

	var fullWindow = lipgloss.JoinVertical(lipgloss.Center, winTitleBar, winBg)

	// return fmt.Sprintf(orangeStyle.Render(myText))
	return fullWindow
}
