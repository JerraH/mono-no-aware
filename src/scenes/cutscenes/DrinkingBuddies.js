class DrinkingBuddies extends DialogueCutscene {
    constructor(config) {
        super(config)
    }
    preload() {
        this.load.image('Akiko-sit', 'assets/images/characters/Akiko-sit.png')
        this.load.image('akiko-sit-fox', 'assets/images/characters/akiko-sit-fox.png')
    }
    this.add.image(250, 300, 'introbackground')
        let dialoguebg = this.add.image(0, 300, 'dialoguebg')
        let Akiko = new Akiko({
            scene: this,
            key: 'Akiko-sit',
            x: 250,
            y: 300
        })
        this.dialogueContainer = this.add.container(600, 40)

        Phaser.Display.Align.In.Center(dialoguebg, this.dialogueContainer);
        dialoguebg.y = 300;
        this.physics.world.disable(Akiko)


        this.actor = Akiko;
        this.words = [];
        this.title = null;
        this.responsesText = [];
        this.selection = [];
        for (let i = 0; i < 2; i++) {
            this.selection.push(this.add.graphics(200, 44));
        }
        this.dialogue = new Dialogue(INTRO_DIALOGUE);
        // console.log('my responses are', this.dialogue.responses)
        store.setDialogue(this.dialogue);


        this.renderCutscene(this.dialogueContainer);

        this.blink = 0;

        this.sound.add('chat').play({
            volume: 0.1
        });

        this.input.keyboard.on('keydown', this.handleKey);
        // this.words.style = { font: "20px Cabin"}


        // this.dialogueWindow = this.scene.launch('dialogue', general)



    //     update(time, delta) {
    //         this.blink += delta;
    //         this.title.alpha = [1,0.85,0.7,0.85][Math.floor(this.blink / 500) % 4];
    //         this.selection[1].alpha = Math.min(1, Math.abs(this.blink % 1000 - 500) / 500);
       }

}


export default DialogueCutscene

}
