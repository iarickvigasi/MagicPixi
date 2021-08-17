const REF_HEIGHT = 640;
const REF_WIDTH = 960;

const Resizer = {
  getMinWidth: () => Math.min(
    (window.innerWidth * REF_HEIGHT) / window.innerHeight,
    (window.innerWidth * REF_WIDTH) / window.innerHeight,
  ),

  getMinHeight: () => Math.min(
    (window.innerHeight * REF_WIDTH) / window.innerWidth,
    (window.innerHeight * REF_HEIGHT) / window.innerWidth,
  ),

  getScale: () => Math.max(
    Resizer.getMinWidth() / window.innerWidth,
    Resizer.getMinHeight() / window.innerHeight,
  ),
};

export default Resizer;
