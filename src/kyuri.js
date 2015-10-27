
var FirstLayer = cc.Layer.extend({
    sprite:null,
    isKeyDown:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        this.sprite = new cc.Sprite(res.mainCharacter, cc.rect(0, 0, 32, 32));

        var tiledMap = new cc.TMXTiledMap(res.map1);
        this.addChild(tiledMap);

        this.sprite.attr({x: size.width/2, y: size.height/2});
        this.addChild(this.sprite);
 
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            //キー入力したとき
            onKeyPressed:this.onkeydownBegan,
            //キーを離したとき
            onKeyReleased: function(keyCode, event){
                var target = event.getCurrentTarget();
                target.isKeyDown = false;
                target.sprite.stopAllActions();
            } 
        }, this);
    },

    onkeydownBegan:function(keyCode, event){
        var target = event.getCurrentTarget();
        // target._super();
        var sprites = [];
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(0, 0, 32, 32)), "main0"); 
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 0, 32, 32)), "main1"); 
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(64, 0, 32, 32)), "main2"); 
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 0, 32, 32)), "main3"); 
        var i,f;
        // var sprites=[];
        for (i=0; i<=3;i++){
            f = cc.spriteFrameCache.getSpriteFrame("main" + i);
            sprites.push(f);
        }
 
        var action_down = new cc.RepeatForever(new cc.Animate(new cc.Animation(sprites, 0.2)));
 
        if (keyCode == 37) {
            //左
        } else if (keyCode == 38) {
            //上
        } else if (keyCode == 39) {
            //右
        } else if (keyCode == 40) {
            if( target.isKeyDown != true){
                target.sprite.runAction(action_down);
            }
            console.log("debug desu " + target.sprite.x + " " + target.sprite.y);
            // target.sprite.moveBy(0,1);
            //下
            target.isKeyDown = true;
        }
    }

});

var FirstScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FirstLayer();
        this.addChild(layer);
    }
});



