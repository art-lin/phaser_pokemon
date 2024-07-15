// Create our only scene called mainScene, in the game.js file
class mainScene {
    // The three methods currently empty
  
    preload() {
        // This method is called once at the beginning
        // It will load all the assets, like sprites and sounds  
        // Parameters: name of the sprite, path of the image
        this.load.image('pokeball', 'assets/pokeball.png');
        this.load.image('pikachu', 'assets/pikachu.jpeg');
    }
    create() {
        // This method is called once, just after preload()
        // It will initialize our scene, like the positions of the sprites
        // Parameters: x position, y position, name of the sprite
        this.pokeball = this.physics.add.sprite(100, 100, 'pokeball').setDisplaySize(50, 50);
        this.pikachu = this.physics.add.sprite(300, 300, 'pikachu').setDisplaySize(50, 50);
        // Store the score in a variable, initialized at 0
        this.score = 0;

        // The style of the text 
        // A lot of options are available, these are the most important ones
        let style = { font: '20px Arial', fill: '#fff' };

        // Display the score in the top left corner
        // Parameters: x position, y position, text, style
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        this.arrow = this.input.keyboard.createCursorKeys();
    }
    update() {
        // This method is called 60 times per second after create() 
        // It will handle all the game's logic, like movements
        // If the player is overlapping with the coin
        if (this.physics.overlap(this.pokeball, this.pikachu)) {
        // Call the new hit() method
        this.hit();
        }
        // Handle horizontal movements
        if (this.arrow.right.isDown) {
            // If the right arrow is pressed, move to the right
            this.pokeball.x += 5;
        } else if (this.arrow.left.isDown) {
            // If the left arrow is pressed, move to the left
            this.pokeball.x -= 5;
        } 
        
        // Do the same for vertical movements
        if (this.arrow.down.isDown) {
            this.pokeball.y += 5;
        } else if (this.arrow.up.isDown) {
            this.pokeball.y -= 5;
        } 
    }
    hit() {
        // Change the position x and y of the coin randomly
        this.pikachu.x = Phaser.Math.Between(100, 600);
        this.pikachu.y = Phaser.Math.Between(100, 300);
      
        // Increment the score by 10
        this.score += 10;
      
        // Display the updated score on the screen
        this.scoreText.setText('score: ' + this.score);

        // Create a new tween 
        this.tweens.add({
            targets: this.player, // on the player 
            duration: 200, // for 200ms 
            scaleX: 1.2, // that scale vertically by 20% 
            scaleY: 1.2, // and scale horizontally by 20% 
            yoyo: true, // at the end, go back to original scale 
        });
    }
}

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});  