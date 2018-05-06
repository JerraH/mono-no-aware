

If you’re like me — and if you're reading this article, I'm presuming you are — you’ve probably dug up a lot of game-making frameworks over the years, and at least glanced at their insides.  Again, assuming you're like me, you've left those encounters frustrated and a little bit battered, leaving metaphorical bloodstains all over the documentation, if there is any.  Most of the tutorials you come across are probably either for a type of game so unrelated to your own project that there isn’t a lot of crossover, or are so far above or below your own level that you would very much like to tear your hair out -- or maybe someone else's, if the frustration reaches fever pitch.

Recently, I have hurled myself upon the rock of Phaser 3, a lovely but mostly undocumented new version of the classic Phaser.io, and have come out on the other side of this cave mostly alive.  Consequently I thought I'd do my part to make sure that future travelers down this particular road don't have to break their noses on the same low-hanging stalactites that got me.  So, brace yourselves for:

# THE UNBAFFLING OF PHASER 3
## (OR, HOW I LEARNED TO STOP WORRYING AND LOVE THE GUN)

### Foreign Lingoage:

Some of you may have worked with Phaser 2.something before; if you read that and thought, “That’s me!,” you can safely skip this section.  If not, onward my good steeds!

Before we get started, I’m going to define some terms for you!
<br />
<b>Game:</b> This is, in the context of Phaser, a global variable.  You declare it once and then can call it from wherever you want, although frankly you probably don’t need to that often!  It contains everything within.  We can think about our "game" as a sequence of…

<b>Scenes:</b>  Basically, every time your screen goes black for a millisecond and reappears with something totally different, that’s a ‘scene.’  A title screen would be one scene, an options selection another, and each ‘level’ or ‘room’ or ‘area’ in a game would be their own (although to some degree this depends on how you decided to design it!).  This means that if you’re making an infinite runner, there’s only one ‘level’, so your entire game could be contained within one scene!

If you’re planning on a game with cutscenes, each cut would be a new scene.

<b>World:</b> your ‘world’ is whatever area your character has access to in a given scene.  In the infinite runner example, the game world would be everything!  If you wanted to divide your game up into ‘rooms’, then the size of each room would be the ‘world’.  You do have to set the size of the world though! By default your character can run off the sides of your room and into the welcoming darkness.

<b>Physics:</b>  This is whatever physics engine you’ve decided to use.  There are three engines by default in Phaser 3: the Arcade, Ninja, and P2 physics engine.  You can enable or disable these engines in general, change it for a particular area, or turn on and off specific laws of physics for scenes or objects at your whim.

<b>Sprite:</b> the image for something onscreen.  Can be animated.  It takes a little more time to load and a little more energy from your processor to render, so Phaser recommends that for anything you don’t need to animate, you use…

<b>Images:</b>  Pretty much exactly the same as a sprite, except without the animation functionality.

<b>Store:</b>  Anybody who's used Redux or another state manager will recognize this.  This is where your game's state is held!  If you're making a simple, one-scene game, like a Mario level, you probably won't need to use this.  You can hold most of your game's state in your scene's constructor or in the constructors for the other objects and characters in the game.  Most things that require persistent memory will go here.  There is in fact a built-in state manager for Phaser.io, but if you like Redux or Fluxable or something, feel free to use that instead.

If that last definition made you shake your head vigorously in an attempt to throw the tears of confusion and pain off into the void, have no fear!  I will go into more detail on this later as necessary.

Alright, now that you’re caught up (or you’ve successfully skipped the definitions section), let’s get to the good stuff!

### A Scene is Nothing Without a Play

First things first: get yourself a boilerplate.  I recommend just starting with the Phaser 3 example boilerplate.

```
git clone https://github.com/photonstorm/phaser3-project-template.git
```

This doesn't have a lot, but it <i>does</i> come with some things to make your life easier, like a webpack configuration (for the uninitiated, this bundles your files to make them easier for the browser to access) and gives you a dev server that will build, run, and watch your files when you run

```
npm run start
```

If you run npm install, then run that in your terminal, you should see the Phaser logo bouncing around in your screen.  If you do, great!  You're ready to move on.  Now, let's take a look at that index.html.

```
import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    var logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}
```
<br />


First things first, let's talk about that...

### Config!


```
 type: Phaser.AUTO
```

Since this is the game config, this is telling you what type of game you're going to make!  The other two options are Phaser.WEBGL and Phaser.CANVAS. Most of the time you're going to want to use Phaser.AUTO -- it will use WebGL where the client's browser can handle it and will downgrade to Canvas where it can't.  However, if you have a frantic bee in your bonnet or something and <i>really need</i> to choose one or the other, this is where you'd do it.

<br />

```
parent: 'phaser-example'
```
This is safe to leave as-is, or change to your game's name, or whatever.  This is just declaring the parent of your game to be something at all, so the compiler doesn't get confused and scream.

The width and height are pretty much what you would guess: here you're setting the width and height of the game window.  It comes at 800 x 600 by default, but you can do whatever you like!  Phaser supports a wide variety of resolutions.

And then we have

```
scene: {
        preload: preload,
        create: create
    }
```
This is the scene config.  Once we have a larger game -- which, hopefully, we will shortly! -- this will not, in fact, go here.  We might have a different config for each scene.  However, this is going to be my first personal recommendation: I suggest that instead of the scene config, we set...

```
physics: {
	default: WHATEVER YOUR HEART DESIRES,
    THAT HEART'/S DESIRE: {
    	debug: true //(or false if you hate the debug)
    }

}
```

So, for example, you might have:

```
physics: {
	default: ninja,
	ninja: {
    	debug: true
    }
}
```
Then, we instantiate our game with a good old:

```
const game = new Phaser.Game(config)
```
(Yes I know it says var in the boilerplate, but I'm using ES6, and I'm certainly not here to judge but if you're not using ES6 by now you should probably look into it!)

Anyway, that just passes the config we wrote into the Game constructor contained within the Phaser module, so it knows what to use.

You may have noticed that the names of the stuff in the scene config matches the name of the methods down below.  Good eye!  They're also some pretty normal English words!  Which brings me to...

## The Circle of Life

Again, we're going to have a little intro-to-concept adventure here for those of us who aren't Javascript gurus but just want to figure out how to make games.  Those of you who have Advanced Metaphysical Degrees in Thaumaturgical Javascript, please forgive my brief diversion.  You can hop right on down to the section entitled "preload".

<br />

One of the key concepts to grasp for any responsive front-end framework is the LIFE CYCLE.

<image of sun rising>
(Yes, it does move us all, though if you find yourself cycling between despair and hope you should probably ask somebody for help)

The life cycle of a component is just like the life cycle of an organism.  It's born, it lives, and it dies.  Every scene has a life cycle; so do your classes, and your instances of your classes, and basically everything you could want to render on the page.

In Phaser, we have, primarily, these life cycle methods:

* preload
* create
* update

Although Phaser runs some destroy methods as well, those are read-only methods buried deep in the Phaser prototypes, so you can't do anything with them.  However, you can run a check to see if the "destroyPhase" flag is set to "true" within the update method, and run any tasks you need to run then!

All of these methods can be used on most components, but you will likely find that they're most useful in scenes

### Preload
You are going to want to call up any external resources you need in your "preload" method.  For instance:

```
preload() {
        this.load.image('zelda', 'assets/images/zelda.png')
        this.load.audio('intro', 'assets/audio/intro.m4a')
        this.load.spritesheet('tiles', 'assets/images/zelda.png', { frameWidth: 16, frameHeight: 16 });
        this.load.audioSprite('sfx', [
          'assets/audio/sfx.ogg',
          'assets/audio/sfx.mp3'
        ], 'assets/audio/sfx.json', {
            instances: 4
          });
    }
```

This does not add them to your scene: it just makes those assets <i>available</i> to that particular scene.  You have the ingredients, but you haven't cooked with them yet.

The first parameter is a string that serves as a key for that image, so you can slap it into your scene wherever you need it!

Alternately, if you have a lot of things you want to preload at once, you can create a whole scene that does nothing but preload your files -- and maybe render a loading screen as it does!

### Create
This is when you start cooking with all those ingredients you bought, and also where the metaphor starts to break down, because I don't usually update my food after I make it.

Still, let's cook up (ha) a few examples.



```
    let background = this.physics.add.staticGroup();
    this.NPCs = this.physics.add.staticGroup();
```
Here you can see I used two different techniques to add <i>things</i> to the scene.  This.NPCs explicitly sets NPCs as a property of the scene, whereas let background sets it as a variable within the scope of the scene, so if you're going to need to access a thing you're making from outside a scene or component, use "this" so you can reference it by calling myScene.NPCs; use a variable if you don't want that property to be accessible from outside the component.

As for the staticGroup, that allows you to add sprites or images to a scene and immediately add them to what works out to be a class, without declaring the class elsewhere.  You create a staticGroup if the things aren't going to move or be affected by gravity; you can do the same thing with this.physics.add.group() if you do want those items to move.

So, you're telling the scene that there's going to be at least one but possibly many background components, and at least one but possibly many NPCs.  It tells physics not to work on these objects, so your NPC doesn't start sliding offscreen when your main character knocks into it, which is a thing that will happen if you don't!  Let's run through actually adding the items to the group.

```
    this.groundLayer = background.create(500, 300, 'bedroom')
```
The 500 and 300 are set in pixels, and they determine where the item is placed.  It measures from the center of the object to the top left corner.  If you set this as 0, 0, you will get:

<insert image here>

The 'bedroom' string is one of those handy keys we set up earlier!

There's a ton more stuff you can do in this method, which will get covered at a later date.

### Update

Effectively, the update method contains anything you want to run more than once!  If you want to get down into the meat of it, it contains any methods that, once run, should tell the component(s) to re-render, because they've changed somehow.

Let's take a look at a handy thing to put in an update method, opening a chest!

```
//INSIDE THE UPDATE METHOD FOR A "CHESTS" CLASS
    this.scene.physics.add.collider(this, this.scene.groundLayer);
    this.scene.physics.overlap(this, this.scene.link, this.openChest);
```
(D)

First, this creates a collider for the chest that prevents it from falling through the ground and off into the infinite depths of an unforgiving universe.  You'll notice two parameters - 'this', referring to the instance of the chest in question, and this.scene.groundlayer, or, the groundlayer of the scene that contains the chest.  (It doesn't have to be called the groundlayer; if it's sitting on a cloud, maybe you called it the cloudmuffin in the scene -- once again, I'm not here to judge).  The first parameter gets checked for collision first, the second, naturally, second.  Practically speaking, it usually doesn't matter which goes where; if you are at a point in your game development journey where you find that it matters, you're probably way beyond the level of this tutorial and should share your wisdom in the comments.

Second, it creates another kind of interaction, this time between the chest and Link -- specifically, the instance of Link that exists within that scene.  This one isn't a collision: it's an "overlap", meaning that the chest will not block Link's movement, but once their bodies overlap -- <b>"body"</b> being the Phaser term roughly equivalent to "hit box" in common parlance -- it triggers the "overlap" event.

You will notice the third parameter in the overlap method.  This is the callback method, and will be called once the event in question is triggered.  In this case, once Link overlaps with the chest, the chest will open, and presumably the animation will play, it'll pick you a nice item to hand over, Link will get stars in his eyes, and then the item ends up in Link's inventory, you are returned to normal gameplay, and everybody's happy.

Now you know the most important life cycle methods!  Congratulations, you're well on your way to being able to make your first Phaser game!

## Creating a Scene

Now let's talk about creating a scene.

First of all, I highly recommend creating a scene called GameScene or something like it as your "base" scene, with a bunch of methods in it like, say, keybindings, or anything else you would really like to carry over to all your scenes without changing much.  With this in mind, let's create a default GameScene!

```
import {Scene} from 'phaser';

export default class GameScene extends Scene {
    constructor(config) {
        super(config);
    }
}
```

This syntax will be familiar to anybody who's used React.  Scene is a component from Phaser, and you can extend this bad boy so you can use everythinggg from the Scene's prototype.  Mostly this is going to be an assortment of methods, but it also confers the essential Scene-ness of a scene, which allows you to do handy things like...

## Starting a new scene

Say you have your first scene working.  Hooray!  But maybe it's not doing a lot, and you'd like to move on to another.  Alternately, maybe you're working in a group and you don't want everybody's code to overlap so you'd really like to work on a bunch of different scenes at once, but you want to know how to get from one to the other.  Fear not!  In its most basic form, this is a simple endeavor.

```
this.input.keyboard.once('keydown', (event) => {
        theme.stop();
        this.sound.add('select').play();
        this.scene.start('VictoryLap');
    });
```
Side note, one of the things you may have noticed is that Phaser really, <i>really</i> loves its method chains.  It's really good at them.  This means that if you want to add a sound to a scene and play it at once, all you have to do is chain the methods, one after the other.

But back to the meat of this sandwich.

This just means that as soon as you press a key -- any key, in this case -- it will emit an event (thankfully, Phaser has native event emitters/handlers) that will then trigger a cascade of reactions, the last of which is starting a scene called VictoryLap.

"But wait!", you might say.  "Is that a <i>string</i> mine eyes doth spy?"

Yes, my dear fellow, it is.

"And you did not instruct me to import the scene from elsewhere, nor to declare this new scene within the scope?"

No, friend, I did not!  We needn't do either of those things.  Custom (and necessity) dictates that we, instead, register our scenes with our game!  Do you remember that Index.js we spoke of near the beginning of our happy little jaunt?  We aren't done with it yet.

So in that file, below our instantiation of our game, we must add:

```
let game = new Phaser.Game(config);
game.scene.add('GameScene', GameScene);
game.scene.add('VictoryLap', VictoryLap);
```
all of which we shall import at the top of the file, like so:

```
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import VictoryLap from './scenes/VictoryLap';
```
<br />
And, voila!  Our scene is registered, our keystrokes callbacking, and we can move from one scene to another like experts.

This concludes today's edition of THE UNBAFFLING OF PHASER 3.  Stay tuned for more updates! They could happen at any moment!

## Next Episode, on DragonBall Z:

More things most Phaser tutorials <i>don't</i> cover: creating classes!  Instantiating classes in a scene!  Hitboxes! Tweens, but not the kind that mobbed the Twilight premieres!  Object interaction!  And loads more action that you won't want to miss!

Now, in the immortal words of RuPaul Charles: Good luck!  And DON'T fuck it up!



