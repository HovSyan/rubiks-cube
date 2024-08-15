precision highp float;

uniform vec3 u_color;
uniform bool u_active;

void main() {
    if (u_active) {
        gl_FragColor = vec4(u_color, 1.0);
    } else {
        gl_FragColor = vec4(u_color, .9);
    }

}