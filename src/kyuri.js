
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

        var downSprites = [];
        var upSprites = [];
        var rightSprites = [];
        var leftSprites = [];

        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(0, 0, 32, 32)), "down0"); 
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 0, 32, 32)), "down1"); 
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(64, 0, 32, 32)), "down2"); 
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 0, 32, 32)), "down3");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(0, 32, 32, 32)), "left0");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 32, 32, 32)), "left1");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(64, 32, 32, 32)), "left2");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 32, 32, 32)), "left3");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(0, 64, 32, 32)), "right0");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 64, 32, 32)), "right1");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(64, 64, 32, 32)), "right2");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 64, 32, 32)), "right3");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(0, 96, 32, 32)), "up0");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 96, 32, 32)), "up1");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(64, 96, 32, 32)), "up2");
        cc.spriteFrameCache.addSpriteFrame(new cc.SpriteFrame(res.mainCharacter, cc.rect(32, 96, 32, 32)), "up3");

        var i,d,l,r,u;
        for (i=0; i<=3;i++){
            d = cc.spriteFrameCache.getSpriteFrame("down" + i);
            l = cc.spriteFrameCache.getSpriteFrame("left" + i);
            r = cc.spriteFrameCache.getSpriteFrame("right" + i);
            u = cc.spriteFrameCache.getSpriteFrame("up" + i);
            downSprites.push(d);
            leftSprites.push(l);
            rightSprites.push(r);
            upSprites.push(u);
        }
 
        var action_down = new cc.RepeatForever(new cc.Animate(new cc.Animation(downSprites, 0.2)));
        var action_left = new cc.RepeatForever(new cc.Animate(new cc.Animation(leftSprites, 0.2)));
        var action_right = new cc.RepeatForever(new cc.Animate(new cc.Animation(rightSprites, 0.2)));
        var action_up = new cc.RepeatForever(new cc.Animate(new cc.Animation(upSprites, 0.2)));
 
        if (keyCode == 37) {
            var moveLeft = cc.moveBy(1.0, cc.p(-10, 0));
            target.sprite.runAction(moveLeft);

            if( target.isKeyDown != true){
                target.sprite.runAction(action_left);
            }
 
            target.isKeyDown = true;
            //左
        } else if (keyCode == 38) {
            var moveUp = cc.moveBy(1.0, cc.p(0, 10));
            target.sprite.runAction(moveUp);

            if( target.isKeyDown != true){
                target.sprite.runAction(action_up);
            }

            target.isKeyDown = true;
            //上
        } else if (keyCode == 39) {
            var moveRight = cc.moveBy(1.0, cc.p(10, 0));
            target.sprite.runAction(moveRight);
 
            if( target.isKeyDown != true){
                target.sprite.runAction(action_right);
            }
           target.isKeyDown = true;
            //右
        } else if (keyCode == 40) {
            var moveDown = cc.moveBy(1.0, cc.p(0, -10));
            target.sprite.runAction(moveDown);
 
            if( target.isKeyDown != true){
                target.sprite.runAction(action_down);
            }

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



