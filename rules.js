let gateKey = 0 //once three are gathered the exit to the good ending is unlocked. i am unsure how exactly i was meant to implement a location-based mechanism or a lock and key puzzle so this is how I did so
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(("Choices" in locationData) == true) { // TODO: check if the location has any Choices  (had to look up "x in y" on stack overflow.)
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                 // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("NIHIL.")
            if (gateKey == 3) {
                if (("Lock" in locationData) == true) {
                    for(let lock of locationData.Lock) { // TODO: loop over the location's Choices
                        this.engine.addChoice(lock.Text, lock); // TODO: use the Text of the choice
                         // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                    }
                }
            }
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if(choice.Text == "Hold on to Hope") {
                this.engine.show(this.engine.storyData.HOPE);
                gateKey += 1;
            };
            if(choice.Text == "NIHIL") {
                this.engine.show(this.engine.storyData.NIHIL);
            };
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');