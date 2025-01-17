import {
	FileArchiveIcon, FileAudioIcon, FileCodeIcon, FileIcon, FileImageIcon, FileTextIcon, FileVideoIcon, type LucideIcon,
} from 'lucide-react';
import {cva, type VariantProps} from 'class-variance-authority';
import * as React from 'react';
import {Button} from '@0n0/ui/button';
import {cn} from '@0n0/ui/lib/utils';
import {type AugmentedFileType, type FileIcon as StringFileIcon} from '~/ffmpeg-util';

function nameToIcon(name: StringFileIcon): LucideIcon {
	switch (name) {
		case 'text': {
			return FileTextIcon;
		}

		case 'code': {
			return FileCodeIcon;
		}

		case 'image': {
			return FileImageIcon;
		}

		case 'video': {
			return FileVideoIcon;
		}

		case 'audio': {
			return FileAudioIcon;
		}

		case 'archive': {
			return FileArchiveIcon;
		}

		// Case 'none':
		default: {
			return FileIcon;
		}
	}
}

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export type ButtonProperties = {
	asChild?: boolean;
	fileType: AugmentedFileType;
	action?: 'CONVERT_TO';
	onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const FileTypeButton = React.forwardRef<HTMLButtonElement, ButtonProperties>(
	({className, variant, size, asChild = false, fileType: {extension, icon, iconColor}, onClick, action, ...properties}, reference) => {
		const Icon = nameToIcon(icon);

		return (
			<Button ref={reference} variant={variant} className={cn('outline-foreground outline-2 aspect-square h-16 w-16 flex flex-col justify-center items-center gap-1 p-2 transition-all', className)} {...properties} onClick={onClick}>
				<Icon className={`h-6 w-6 text-gray-500 ${iconColor}`} />
				<h3>{action ? `${action} ` : ''}{extension}</h3>
			</Button>
		);
	});
FileTypeButton.displayName = 'FileTypeButton';
