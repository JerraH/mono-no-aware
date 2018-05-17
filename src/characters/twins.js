import Character from './character'
import Dialogue from '../Dialogue';

let TWINS_DIALOGUE = [{
  type: 'Node',
  id: 'e3965eb9-2334-4fdb-82c6-f7b8bbf3c4cb',
  actor: 'Mizuko & Mizuno',
  name: "\"You finally came,\" the twins say, almost in unison, with such an air of certainty that it's discomfiting.  \"We've been waiting for you.\"",
  choices: ['f1421968-f4f8-496b-844b-6d8fad6bc6f2', '9a31ffee-c718-4804-8386-8d240a268d0a', '7bec5719-5b92-43ea-9946-e320921ba6e8']
}, {
  type: 'Choice',
  id: 'f1421968-f4f8-496b-844b-6d8fad6bc6f2',
  title: '',
  name: "\"Uh.... I see.  That's... good to know.\"",
  next: '23f0f235-0702-4833-9d45-02550ed507c6'
}, {
  type: 'Text',
  id: '23f0f235-0702-4833-9d45-02550ed507c6',
  actor: 'Mizuko & Mizuno',
  name: "\"Uh.... I see.  That's... good to know.\"\n\nYou wonder sometimes if they practice this, if they learned to do it just because it annoyed the adults around them, or if they had been born with that preternatural ability to make people uncomfortable.\n\n\"Did you have something you wanted to ask us, $protag-title Setsuna?\" Michiko asked, her smile sweet but too knowing.",
  choices: ['4e5f8e09-2969-45ba-baf0-d3293c15f1fa']
}, {
  type: 'Choice',
  id: '9a31ffee-c718-4804-8386-8d240a268d0a',
  title: '',
  name: "\"...That's... creepy, but ok.  Actually, on second thought, I'm definitely regretting this conversation.\"",
  next: '392aba58-fe99-4633-b555-86d3990b73ee'
}, {
  type: 'Choice',
  id: '4e5f8e09-2969-45ba-baf0-d3293c15f1fa',
  title: '',
  name: "I'd been hoping you had some ",
  next: null
}, {
  type: 'Text',
  id: '392aba58-fe99-4633-b555-86d3990b73ee',
  actor: 'Mizuko & Mizuno',
  name: "\"You'll change your mind.  When you do, we'll be here.\"",
  next: null
}, {
  type: 'Choice',
  id: '7bec5719-5b92-43ea-9946-e320921ba6e8',
  title: '',
  name: '"Might I ask why?"',
  next: '8b435735-cbb4-4d31-9ff6-2c592aabfa6a'
}, {
  type: 'Text',
  id: '8b435735-cbb4-4d31-9ff6-2c592aabfa6a',
  actor: 'Mizuko & Mizuno',
  name: '"You are on an important path.  We are bound to help you."',
  choices: ['6de645e6-dccd-4931-9875-ac135def5514', '3e3dc0e7-3ca6-42ea-b9e5-2f9fd64daa97']
}, {
  type: 'Choice',
  id: '6de645e6-dccd-4931-9875-ac135def5514',
  title: '',
  name: "\"You guys really have a flair for the dramatic, don't you.\"",
  next: null
}, {
  type: 'Choice',
  id: '3e3dc0e7-3ca6-42ea-b9e5-2f9fd64daa97',
  title: '',
  name: '"Do you know how to cure the Empress?"',
  next: '3d98dd15-9ac3-45aa-82ad-d34d9bfd98d3'
}, {
  type: 'Text',
  id: '700d9d59-f737-4b29-9aa8-083832c2bdd3',
  actor: 'Mizuko & Mizuno',
  name: '"Do you know how to cure the empress?"\n\n"No," they say, shaking their heads. "We know only that we must give this to you."\n\nA bow appears, almost out of nowhere; Mizuno hands it to you.\n\n"We do not know when or where you will need it; only that you will use it, before the end."\n',
  choices: ['6d092308-faa0-43c2-ad95-8487c684db48', '995915e4-d427-402f-a818-458b38aaf1c0']
}, {
  type: 'Branch',
  id: 'ff80be21-b549-4ed3-aa36-b38d0e5390bc',
  variable: 'has-conversed',
  branches: {
    True: 'b50cfeee-5fcc-46bc-8498-f0b2c71eb592',
    _default: '15f0ffe7-cbad-4848-87fe-a0d6efedd7c7'
  }
}, {
  type: 'Set',
  id: '15f0ffe7-cbad-4848-87fe-a0d6efedd7c7',
  variable: 'has-conversed',
  value: 'true',
  next: 'e3965eb9-2334-4fdb-82c6-f7b8bbf3c4cb'
}, {
  type: 'Branch',
  id: 'b50cfeee-5fcc-46bc-8498-f0b2c71eb592',
  variable: 'Item',
  branches: {}
}, {
  type: 'Choice',
  id: '6d092308-faa0-43c2-ad95-8487c684db48',
  title: '',
  name: '"You guys still creep me out but -- thanks, I guess."',
  next: '526c7f03-24bd-40c2-a0c4-5f2e1c03b326'
}, {
  type: 'Choice',
  id: '995915e4-d427-402f-a818-458b38aaf1c0',
  title: '',
  name: '"Thank you."',
  next: '695228c8-6850-43ea-a5d6-f6ce7f773dcd'
}, {
  type: 'Text',
  id: '695228c8-6850-43ea-a5d6-f6ce7f773dcd',
  actor: '',
  name: '"Thank you."\n\n"Be well, and may the gods be kind."',
  next: null
}, {
  type: 'Text',
  id: '526c7f03-24bd-40c2-a0c4-5f2e1c03b326',
  actor: '',
  name: '"You guys still creep me out but -- thanks, I guess."\n\n"Come back if you find you have need of us."',
  next: null
}, {
  type: 'Set',
  id: '3d98dd15-9ac3-45aa-82ad-d34d9bfd98d3',
  variable: 'item',
  value: 'bow',
  next: '700d9d59-f737-4b29-9aa8-083832c2bdd3'
}]

export default class Twins extends Character {
  constructor(config) {
    super(config);
    this.name = 'Twins';
    this.dialogue = new Dialogue(TWINS_DIALOGUE, this);

    // this.state = {
    //   happinessMeter: 50,
    //   inebriationLevel: 0
    // inConversation: false
    // }

    //this sets the size of the hit box
    this.body.height = 20
    this.body.width = 120
    this.body.offset = {
      x: 10,
      y: 160
    };


  }


}
