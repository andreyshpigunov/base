# Autoprefixer issue, when background: linear-gradient with wrong syntax.
Wrong:
background-image: linear-gradient(left, rgba(255,255,255,0) 0%, #f6f6f9 100%);
Right:
background-image: linear-gradient(to left, rgba(255,255,255,0) 0%, #f6f6f9 100%);