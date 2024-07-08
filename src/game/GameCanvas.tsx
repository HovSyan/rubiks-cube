import React, { forwardRef } from "react";

export default forwardRef<HTMLCanvasElement>(function GameCanvas(_, ref) {
    return <canvas ref={ref} ></canvas>
})

