import * as PIXI from 'pixi.js';

export default function decorate(scene: PIXI.Container) {
  const leftBar = PIXI.Sprite.from('assets/img/bar.png');
  leftBar.scale.set(0.5);
  leftBar.x = 0;
  leftBar.y = 0;
  scene.addChild(leftBar);

  const rightBar = PIXI.Sprite.from('assets/img/bar.png');
  rightBar.scale.set(-0.5, 0.5);
  rightBar.x = window.Application.screen.width;
  rightBar.y = 0;
  scene.addChild(rightBar);

  let filledHeight = leftBar.height;
  let prevY = leftBar.y;
  while (window.Application.screen.height > filledHeight * 0.5) {
    const newLeftBar = PIXI.Sprite.from('assets/img/bar.png');
    newLeftBar.scale.set(0.5);
    newLeftBar.x = 0;
    newLeftBar.y = prevY + leftBar.height;

    const newRightBar = PIXI.Sprite.from('assets/img/bar.png');
    newRightBar.scale.set(-0.5, 0.5);
    newRightBar.x = rightBar.x;
    newRightBar.y = prevY + rightBar.height;

    scene.addChild(newLeftBar);
    scene.addChild(newRightBar);

    prevY = newLeftBar.y;
    filledHeight += filledHeight + newLeftBar.height;
  }

  const topBar = PIXI.Sprite.from('assets/img/bar.png');
  topBar.scale.set(-0.5, 0.5);
  topBar.x = 0;
  topBar.y = 0;
  topBar.angle = -90;
  scene.addChild(topBar);

  const lowBar = PIXI.Sprite.from('assets/img/bar.png');
  lowBar.scale.set(0.5, 0.5);
  lowBar.x = 0;
  lowBar.y = window.Application.screen.height;
  lowBar.angle = -90;
  scene.addChild(lowBar);

  let filledWidth = topBar.height;
  let prevX = topBar.x;
  while (window.Application.screen.width > filledWidth * 0.5) {
    const newTopBar = PIXI.Sprite.from('assets/img/bar.png');
    newTopBar.scale.set(-0.5, 0.5);
    newTopBar.x = prevX + topBar.height;
    newTopBar.y = 0;
    newTopBar.angle = -90;
    scene.addChild(newTopBar);

    const newLowBar = PIXI.Sprite.from('assets/img/bar.png');
    newLowBar.scale.set(0.5, 0.5);
    newLowBar.x = prevX + topBar.height;
    newLowBar.y = window.Application.screen.height;
    newLowBar.angle = -90;
    scene.addChild(newLowBar);

    prevX = newTopBar.x;
    filledWidth += filledWidth + newTopBar.height;
  }

  const topLeftCube = PIXI.Sprite.from('assets/img/cube.png');
  topLeftCube.scale.set(0.5);
  topLeftCube.x = 0;
  topLeftCube.y = 0;
  scene.addChild(topLeftCube);

  const topRightCube = PIXI.Sprite.from('assets/img/cube.png');
  topRightCube.scale.set(0.5);
  topRightCube.anchor.set(1, 0);
  topRightCube.x = window.Application.screen.width;
  topRightCube.y = 0;
  scene.addChild(topRightCube);

  const lowRightCube = PIXI.Sprite.from('assets/img/cube.png');
  lowRightCube.scale.set(0.5);
  lowRightCube.anchor.set(1, 1);
  lowRightCube.x = window.Application.screen.width;
  lowRightCube.y = window.Application.screen.height;
  scene.addChild(lowRightCube);

  const lowLeftCube = PIXI.Sprite.from('assets/img/cube.png');
  lowLeftCube.scale.set(0.5);
  lowLeftCube.anchor.set(0, 1);
  lowLeftCube.x = 0;
  lowLeftCube.y = window.Application.screen.height;
  scene.addChild(lowLeftCube);
}
