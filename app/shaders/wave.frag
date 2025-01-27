#version 300 es
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform float u_mass;
out vec4 fragColor;

/*--- BEGIN OF SHADERTOY ---*/

vec4 colormap(float x) {
    float intensity = x;

    float red = 0.1f * intensity;
    float green = 0.4f * intensity;
    float blue = 0.8f * intensity;

    return vec4(red, green, blue, 1.0f);

}

// https://iquilezles.org/articles/warp
/*float noise( in vec2 x ) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float a = textureLod(iChannel0,(p+vec2(0.5,0.5))/256.0,0.0).x;
	float b = textureLod(iChannel0,(p+vec2(1.5,0.5))/256.0,0.0).x;
	float c = textureLod(iChannel0,(p+vec2(0.5,1.5))/256.0,0.0).x;
	float d = textureLod(iChannel0,(p+vec2(1.5,1.5))/256.0,0.0).x;
    return mix(mix( a, b,f.x), mix( c, d,f.x),f.y);
}*/

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898f, 4.1414f))) * 43758.5453f);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0f - 2.0f * u);

    float res = mix(mix(rand(ip), rand(ip + vec2(1.0f, 0.0f)), u.x), mix(rand(ip + vec2(0.0f, 1.0f)), rand(ip + vec2(1.0f, 1.0f)), u.x), u.y);
    return res * res;
}

const mat2 mtx = mat2(0.80f, 0.60f, -0.60f, 0.80f);

float fbm(vec2 p) {
    float f = 0.0f;

    f += 0.500000f * noise(p + iTime);
    p = mtx * p * 2.02f;
    f += 0.031250f * noise(p);
    p = mtx * p * 2.01f;
    f += 0.250000f * noise(p);
    p = mtx * p * 2.03f;
    f += 0.125000f * noise(p);
    p = mtx * p * 2.01f;
    f += 0.062500f * noise(p);
    p = mtx * p * 2.04f;
    f += 0.015625f * noise(p + sin(iTime));

    return f / 0.96875f;
}

float pattern(in vec2 p) {
    return fbm(p + fbm(p + fbm(p)));
}

vec2 rotate(vec2 mt, vec2 st, float angle) {
    float cos = cos(angle * 3.14159265359f);
    float sin = sin(angle * 0.0f);
    float nx = (cos * (st.x - mt.x)) + (sin * (st.y - mt.y)) + mt.x;
    float ny = (cos * (st.y - mt.y)) - (sin * (st.x - mt.x)) + mt.y;
    return vec2(nx, ny);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    vec2 mt = iMouse / iResolution.xy;

    // Adjust for aspect ratio
    float aspect = iResolution.x / iResolution.y;
    uv.x *= aspect;
    mt.x *= aspect;

    float dx = uv.x - mt.x;
    float dy = uv.y - mt.y;
    float dist = sqrt(dx * dx + dy * dy);
    float pull = u_mass / (dist * dist);
    vec2 r = rotate(mt, uv, pull);
    float shade = pattern(r);
    vec3 color = colormap(shade).rgb;

    float innerRadius = 0.14f;
    float outerRadius = 0.15f;

    if(dist < innerRadius) {
        color = vec3(0.0f);
        fragColor = vec4(color, 1.0f);
    } else if(dist < outerRadius) {
        float alpha = 1.0f - smoothstep(innerRadius, outerRadius, dist);
        fragColor = vec4(color, mix(alpha, shade, (dist - innerRadius) / (outerRadius - innerRadius)));
    } else {
        fragColor = vec4(color, shade);
    }
}

/*--- END OF SHADERTOY ---*/

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}
