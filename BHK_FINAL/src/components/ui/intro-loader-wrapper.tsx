"use client";

import { IntroLoader } from "./intro-loader";
import { useState } from "react";

export function IntroLoaderWrapper() {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return <IntroLoader onComplete={() => setShow(false)} />;
}
