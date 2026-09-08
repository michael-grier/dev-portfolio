"""Render a static, print-friendly version of the portfolio lightfield.

Requires NumPy and Pillow. Run only when changing the decorative artwork.
"""

from pathlib import Path

import numpy as np
from PIL import Image


def build():
    """Fade paired blue and pink rays to transparency before they reach body text."""
    width, height = 1600, 1000
    y, x = np.mgrid[0:height, 0:width]
    dx, dy = x - width * 0.87, y - height * 0.2
    distance = np.hypot(dx, dy)
    angle = np.arctan2(dy, dx)
    # The unequal ray intervals follow the site's burst instead of a regular star.
    angles = [-3.02, -2.72, -2.42, -2.16, -1.92, -1.72, -1.55, -1.38,
              -1.22, -1.02, -0.86, -0.66, -0.46, -0.28, -0.12, 0.08,
              0.28, 0.46, 0.64, 0.84, 1.02, 1.18, 1.36, 1.54, 1.72,
              1.9, 2.08, 2.24, 2.42, 2.68]
    fade = np.clip(x / (width * 0.55), 0, 1) ** 2
    fade *= np.clip((height - y) / (height * 0.7), 0, 1) ** 2
    fade *= np.exp(-((distance / (width * 0.64)) ** 2))
    rgb = np.ones((height, width, 3))
    for offset, colour in [(-0.006, (0, 120, 191)), (0.006, (255, 72, 176))]:
        strength = np.zeros_like(distance)
        for index, ray in enumerate(angles):
            delta = np.arctan2(np.sin(angle - ray - offset), np.cos(angle - ray - offset))
            spread = 0.0035 + (index % 3) * 0.002
            strength += np.exp(-0.5 * (delta / spread) ** 2) * 0.11
            strength += np.exp(-0.5 * (delta / (spread * 4)) ** 2) * 0.018
        strength += np.exp(-((distance / 145) ** 2)) * 0.07
        alpha = np.clip(strength * fade, 0, 0.20)[..., None]
        rgb = rgb * (1 - alpha) + np.array(colour) / 255 * alpha
    output = Path(__file__).parent / "resume-assets/lightburst.png"
    Image.fromarray(np.uint8(np.clip(rgb, 0, 1) * 255)).save(output)
    print(output)


if __name__ == "__main__":
    build()
