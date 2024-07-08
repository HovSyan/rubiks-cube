export const WindowDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
    
    get aspect() {
        return this.width / this.height
    }
}