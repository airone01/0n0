'use client';

import { TypeAnimation } from "react-type-animation";

export default function TypingAnimation() {
  return <TypeAnimation
    className="h-6"
    sequence={['Convert anything to anything']}
    cursor={false}
  />
}
