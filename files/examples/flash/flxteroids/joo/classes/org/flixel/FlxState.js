joo.classLoader.prepare("package org.flixel",/*
{
	import flash.display.Sprite
	import flash.geom.Rectangle*/

	/**
	 * This is the basic game "state" object - e.g. in a simple game
	 * you might have a menu state and a play state.
	 * It acts as a kind of container for all your game objects.
	 * You can also access the game's background color
	 * and screen buffer through this object.
	 * FlxState is kind of a funny class from the technical side,
	 * it is just a regular Flash Sprite display object,
	 * with one member variable: a flixel <code>FlxGroup</code>.
	 * This means you can load it up with regular Flash stuff
	 * or with flixel elements, whatever works!
	 */
	"public class FlxState extends flash.display.Sprite",6,function($$private){;return[function(){joo.classLoader.init(org.flixel.FlxG);},
	
		/**
		 * This static variable holds the screen buffer,
		 * so you can draw to it directly if you want.
		 */
		"static public var",{ screen/*:FlxSprite*/:null},
		/**
		 * This static variable indicates the "clear color"
		 * or default background color of the game.
		 * Change it at ANY time using <code>FlxState.bgColor</code>.
		 */
		"static public var",{ bgColor/*:uint*/:0},
		/**
		 * Internal group used to organize and display objects you add to this state.
		 */
		"public var",{ defaultGroup/*:FlxGroup*/:null},
		
		/**
		 * Creates a new <code>FlxState</code> object,
		 * instantiating <code>screen</code> if necessary.
		 */
		"public function FlxState",function FlxState$()
		{
			this.super$6();
			this.defaultGroup = new org.flixel.FlxGroup();
			if(org.flixel.FlxState.screen == null)
			{
				org.flixel.FlxState.screen = new org.flixel.FlxSprite();
				org.flixel.FlxState.screen.createGraphic(org.flixel.FlxG.width,org.flixel.FlxG.height,0,true);
				org.flixel.FlxState.screen.origin.x = org.flixel.FlxState.screen.origin.y = 0;
				org.flixel.FlxState.screen.antialiasing = true;
				org.flixel.FlxState.screen.exists = false;
				org.flixel.FlxState.screen.solid = false;
				org.flixel.FlxState.screen.fixed = true;
			}
		},
		
		/**
		 * Override this function to set up your game state.
		 * This is where you create your groups and game objects and all that good stuff.
		 */
		"public function create",function create()/*:void*/
		{
			//nothing to create initially
		},
		
		/**
		 * Adds a new FlxCore subclass (FlxSprite, FlxBlock, etc) to the game loop.
		 * FlxState is adding this object to its built-in FlxGroup to automate updating and rendering.
		 * 
		 * @param	Core	The object you want to add to the game loop.
		 */
		"public function add",function add(Core/*:FlxObject*/)/*:FlxObject*/
		{
			return this.defaultGroup.add(Core);
		},
		
		/**
		 * Override this function to do special pre-processing FX like motion blur.
		 * You can use scaling or blending modes or whatever you want against
		 * <code>FlxState.screen</code> to achieve all sorts of cool FX.
		 */
		"public function preProcess",function preProcess()/*:void*/
		{
			org.flixel.FlxState.screen.fill(org.flixel.FlxState.bgColor);	//Default behavior - just overwrite buffer with background color
		},
		
		/**
		 * Automatically goes through and calls update on everything you added to the game loop,
		 * override this function to handle custom input and perform collisions/
		 */
		"public function update",function update()/*:void*/
		{
			this.defaultGroup.update();
		},
		
		/**
		 * This function collides <code>defaultGroup</code> against <code>defaultGroup</code>
		 * (basically everything you added to this state).
		 */
		"public function collide",function collide()/*:void*/
		{
			org.flixel.FlxU.collide(this.defaultGroup,this.defaultGroup);
		},
		
		/**
		 * Automatically goes through and calls render on everything you added to the game loop,
		 * override this loop to manually control the rendering process.
		 */
		"public function render",function render()/*:void*/
		{
			this.defaultGroup.render();
		},

		/**
		 * Override this function to do special pre-processing FX like light bloom.
		 * You can use scaling or blending modes or whatever you want against
		 * <code>FlxState.screen</code> to achieve all sorts of cool FX.
		 */
		"public function postProcess",function postProcess()/*:void*/
		{
			//no fx by default
		},
		
		/**
		 * Override this function to handle any deleting or "shutdown" type operations you
		 * might need (such as removing traditional Flash children like Sprite objects).
		 */
		"public function destroy",function destroy()/*:void*/
		{
			this.defaultGroup.destroy();
		},
	];},[],["flash.display.Sprite","org.flixel.FlxGroup","org.flixel.FlxSprite","org.flixel.FlxG","org.flixel.FlxU"], "0.8.0", "0.8.1"
);