

If you’re like me — and in this case I’m presuming you are if you’re reading this article — you’ve probably looked into a lot of game-making frameworks over the years: some too complex, some not complex enough, some downright baffling, many poorly documented.  Most of the tutorials you come across are either for a type of game so unrelated to your own project that there isn’t a lot of crossover, or are so far above or below your own level that you want to tear your — or someone else’s! - hair out

Also, if you’re like me — and in this case I assume nothing — you also don’t want other people to hit the same roadblocks and break their noses on the same things you did, so you’ll understand why I’m here.  Either way, sit back and enjoy

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
    	debug: true (or false if you hate the debug)
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

Again, we're going to have a little intro-to-concept adventure here for those of us who aren't Javascript gurus but just want to figure out how to make games.  Those of you who have Advanced Metaphysical Degrees in Thaumaturgical Javascript, please forgive my brief diversion.  You may want to skip this whole section, except for the list of method names.

One of the key concepts to grasp for any responsive front-end framework is the LIFE CYCLE.

<image of sun rising>
(Yes, it does move us all, though if you find yourself cycling between despair and hope you should probably ask somebody for help)

The life cycle of a component is just like the life cycle of an organism.  It's born, it lives, and it dies.  Every scene has a life cycle; so do your classes, and your instances of your classes, and basically everything you could want to render on the page.

In Phaser, we have, primarily, these life cycle methods:

*
