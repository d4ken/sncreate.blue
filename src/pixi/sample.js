import * as PIXI from 'pixi.js';
import piyo from "/src/pixi/images/piyoko.png";

const screenWidth = 480;
const screenHeight = 480;
const widRatio = 0.9;
const heiRatio = 0.95;
const app = new PIXI.Application({
    width: screenWidth,
    heigh: screenHeight,
    resizeTo: window,
    background: '#202B38' });

let elm = document.getElementById('app');
elm.appendChild(app.view);

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

const basicText = new PIXI.Text('ぴよこ回転中', style);

basicText.x = 0;
basicText.y = 50;

app.stage.addChild(basicText);

// create a new Sprite from an image path
const piyoko = PIXI.Sprite.from("/home/piyoko.png");

// center the sprite's anchor point
piyoko.anchor.set(0.5);
piyoko.scale.x = 2;
piyoko.scale.y = 2;
// move the sprite to the center of the screen
piyoko.x = screenWidth / 2;
piyoko.y = screenHeight / 2;

app.stage.addChild(piyoko);

// Listen for animate update
app.ticker.add((delta) =>
{
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    piyoko.rotation -= 0.05 * delta;
});

// スクリーンリサイズ処理
function screenResize() {
    let wid = widRatio*window.innerWidth;//ゲームを表示できる最大横幅
    let hei = heiRatio*window.innerHeight;//ゲームを表示できる最大縦幅
    let x = screenWidth;
    let y = screenHeight;
    app.stage.scale.x = app.stage.scale.y = 1;//スクリーン幅が十分の時は画面倍率を1にする
    let resizeRatio = Math.min(wid/screenWidth, hei/screenHeight);//横幅と縦幅の、ゲーム画面に対する比のうち小さい方に合わせる
    if(wid < screenWidth || hei < screenHeight) {//スクリーン幅が足りないとき
        //リサイズ倍率を調整
        x = screenWidth*resizeRatio;
        y = screenHeight*resizeRatio;
        app.stage.scale.x = resizeRatio;
        app.stage.scale.y = resizeRatio;
    }
    app.renderer.resize(x, y);//レンダラーをリサイズ
}
window.addEventListener("load", screenResize);//ロード時に画面サイズを変える
window.addEventListener('resize',screenResize,false);//ウィンドウの大きさが変わったらその都度画面サイズを変える