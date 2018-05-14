import Character from './character'
import Dialogue from '../Dialogue';

let AKIKO_DIALOGUE = [
    {
        "type": "Node",
        "id": "b17c37fb-5006-4bf1-b5c0-d8ce645d4064",
        "actor": "General",
        "name": "Thank the gods you've returned.  We tried to reach you.  Our messenger rode hard for three days -- damn near rode his horse to death -- but returned without your reply.  And not a moment too soon, I suspect.",
        "choices": [
            "5f0e42c9-f71f-4759-8457-002546c31327",
            "ce021b8f-d7b4-4fb1-baee-2bc93a8f970e"
        ]
    },
    {
        "type": "Choice",
        "id": "5f0e42c9-f71f-4759-8457-002546c31327",
        "title": "Kind",
        "name": "\"What is it?  Is something wrong?",
        "next": "54d1b19d-3bd9-4683-98b3-88fd0f4589cd"
    },
    {
        "type": "Choice",
        "id": "ce021b8f-d7b4-4fb1-baee-2bc93a8f970e",
        "title": "Full of self",
        "name": "\"Not to worry, I'll take over from here.\"",
        "next": "faf6f991-9eef-41ae-b45e-e2232588526b"
    },
    {
        "type": "Set",
        "id": "faf6f991-9eef-41ae-b45e-e2232588526b",
        "variable": "Humility",
        "value": "-20",
        "next": "098b20b3-cf2e-4bc1-86b2-e7b6921fff05"
    },
    {
        "type": "Set",
        "id": "098b20b3-cf2e-4bc1-86b2-e7b6921fff05",
        "variable": "Smarmy",
        "value": "+10",
        "next": "237d7dc7-f1a3-4dca-b46e-3781080f84c8"
    },
    {
        "type": "Text",
        "id": "54d1b19d-3bd9-4683-98b3-88fd0f4589cd",
        "actor": "General",
        "name": "You descend from your carriage as quickly as grace will allow.\n\n\"What is it?  Is something wrong?\n\n\"Worse than you fear,\" said the General; your stomach lurches as if you were still on the carriage.  \"Not long after your departure, the Empress fell deathly ill.  She is unable to rouse herself for either company or the demands of her duties.  She may be coaxed into taking broth with great effort, but little more than that.  We fear she may only have a few days remaining.",
        "choices": [
            "c02ec2c1-ddd8-4cc0-8e3f-74f606db74bf"
        ]
    },
    {
        "type": "Text",
        "id": "237d7dc7-f1a3-4dca-b46e-3781080f84c8",
        "actor": "General",
        "name": "\"Alright, alright, calm down. Not to worry, I'll take over from here. What seems to be the trouble?\"\n\nThe general sighs.\n\n\"I see your pilgrimage has done nothing for your humility,\" he says, though you count the strained amusement in his voice as a victory.  \"Not that I had expected it would, and the Empress appears to favor you as you are.\"",
        "choices": [
            "42ad5e36-e8e0-479d-8fc2-e7c91e54acc2",
            "e605dd13-d01b-4f56-b4a7-003e347b3bb7",
            "be2b850d-64c9-4637-a22e-eccac03361ed"
        ]
    },
    {
        "type": "Choice",
        "id": "42ad5e36-e8e0-479d-8fc2-e7c91e54acc2",
        "title": "Dismissive",
        "name": "\"You would do well to remember it.\"",
        "next": "c18dbf20-4d54-4553-b936-e170e787247b"
    },
    {
        "type": "Text",
        "id": "3f121698-23c2-4fc4-8998-0648864e7d34",
        "actor": "General",
        "name": "\"That she does, and you would do well to remember it,\" you say, sweeping forward to stand beside him.  He is somehow unimpressive  despite his height and the richness of his clothing.\n\nHe frowns, but continues anyway.\n\n\"I hope you hold her in equal esteem, because she needs your prayers and whatever other assistance you can suggest.\"",
        "next": null
    },
    {
        "type": "Set",
        "id": "c18dbf20-4d54-4553-b936-e170e787247b",
        "variable": "Humility",
        "value": "-20",
        "next": "763c859e-6ff7-4676-b8ce-8c7e1e0705af"
    },
    {
        "type": "Set",
        "id": "763c859e-6ff7-4676-b8ce-8c7e1e0705af",
        "variable": "Arrogance",
        "value": "+20",
        "next": "3f121698-23c2-4fc4-8998-0648864e7d34"
    },
    {
        "type": "Choice",
        "id": "e605dd13-d01b-4f56-b4a7-003e347b3bb7",
        "title": "Humble",
        "name": "\"Does she?\"",
        "next": "8a732f85-cfcc-422a-822d-76bbe729ef9a"
    },
    {
        "type": "Choice",
        "id": "be2b850d-64c9-4637-a22e-eccac03361ed",
        "title": "Grateful",
        "name": "\"That's good to hear.\"",
        "next": "873b1892-a7b6-422e-aceb-5e81587f6bb6"
    },
    {
        "type": "Text",
        "id": "c263119a-e95b-409f-866a-7418df9c906d",
        "actor": "General",
        "name": "\"I am glad to hear you say so,\" you say, striding up to stand beside him; despite your levity, the creases beside his eyes do not soften.  \"She is very dear to me.\"\n\n\"That's why we made every attempt to reach you,\" the General said, and that same worry clutches at your stomach again.  \n\n\"Not long after your departure, the Empress fell deathly ill.  She is unable to rouse herself for either company or the demands of her duties.  She may be coaxed into taking broth with great effort, but little more than that.  We fear she may only have a few days remaining.\"",
        "next": null
    },
    {
        "type": "Set",
        "id": "8a732f85-cfcc-422a-822d-76bbe729ef9a",
        "variable": "Humility",
        "value": "+10",
        "next": "0105f58c-58c0-4c9c-8840-df6b99f67cbc"
    },
    {
        "type": "Text",
        "id": "0105f58c-58c0-4c9c-8840-df6b99f67cbc",
        "actor": "General",
        "name": "Despite everything, you find that hearing the words in such a tangible, concrete way invites  your cheeks to flush, your heart beating faster.\n\n\"Does she?\" you ask, unable to come up with anything more intelligent in the face of your own ",
        "next": null
    },
    {
        "type": "Set",
        "id": "873b1892-a7b6-422e-aceb-5e81587f6bb6",
        "variable": "Humility",
        "value": "+5",
        "next": "c263119a-e95b-409f-866a-7418df9c906d"
    },
    {
        "type": "Choice",
        "id": "c02ec2c1-ddd8-4cc0-8e3f-74f606db74bf",
        "title": "Crying",
        "name": "\"Oh, gods... what do the doctors say?",
        "next": "6b5451ad-2fe4-4d7d-9256-553a107fe31f"
    },
    {
        "type": "Text",
        "id": "6b5451ad-2fe4-4d7d-9256-553a107fe31f",
        "actor": "General",
        "name": "A wellspring of tears, sudden and hot, stings the corners of your eyes.  It's not grief, not yet -- more like shock, cold and entire, like an afternoon storm on horseback.\n\n\"What do the doctors say?\" you ask, although you're sure you know the answer: if they had anything useful to add, the Empress would not be in such a state.",
        "next": null
    }
];

export default class General extends Character {
  constructor(config) {
    super(config);
    this.name = 'General';
    this.pronouns = 'he'

    // this.state = {
    //   happinessMeter: 50,
    //   inebriationLevel: 0
      // inConversation: false
    // }

    //this sets the size of the hit box
    this.body.height = 20
    this.body.width = 120
    this.body.offset = {x: 10, y: 160};


  }


}
