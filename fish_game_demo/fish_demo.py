import random
from fish_game_demo.pygame_functions import *

height = 768
width = 1024
screenSize(width, height, fullscreen=True)
setBackgroundImage("game_imgs/Animation Background.png")
setAutoUpdate(False)
fish = makeSprite("game_imgs/sea.png")
showSprite(fish)
fish_x = width/2
fish_y = height/2
moveSprite(fish, fish_x, fish_y)
moved = False
balls = []

for i in range(10):
    ball = {}
    ball["sprite"] = makeSprite("game_imgs/football-ball.png")
    ball["sprite"].addImage("game_imgs/soccer-ball.png")
    ball["x"] = random.randint(0, height)
    ball["y"] = random.randint(0, width)
    moveSprite(ball["sprite"], ball["x"], ball["y"])
    ball["x_speed"] = random.randint(-10, 10)
    ball["y_speed"] = random.randint(-10, 10)
    showSprite(ball["sprite"])
    balls.append(ball)


def move_fish():
    global fish
    global fish_x
    global fish_y
    global moved
    if keyPressed("right"):
        transformSprite(fish, 0, 1)
        fish_x += 16
        moved = True
    elif keyPressed("down"):
        transformSprite(fish, 90, 1)
        fish_y += 16
        moved = True
    elif keyPressed("up"):
        transformSprite(fish, -90, 1)
        fish_y -= 16
        moved = True
    elif keyPressed("left"):
        transformSprite(fish, 0, 1, hflip=True)
        fish_x -= 16
        moved = True

    if fish_x >= width:
        fish_x = 0
    elif fish_x < 0:
        fish_x = width

    if fish_y >= height:
        fish_y = -128
    elif fish_y < -128:
        fish_y = height

    moveSprite(fish, fish_x, fish_y)


def move_balls():
    global balls
    for ball in balls:
        ball["x"] += ball["x_speed"]
        if ball["x"] >= width:
            ball["x"] = 0
        elif ball["x"] < 0:
            ball["x"] = width

        ball["y"] += ball["y_speed"]
        if ball["y"] >= height:
            ball["y"] = 0
        elif ball["y"] < 0:
            ball["y"] = height

        moveSprite(ball["sprite"], ball["x"], ball["y"])


while True:
    move_fish()
    move_balls()

    hits = allTouching(fish)

    if moved:
        for hit in hits:
            changeSpriteImage(hit, 1)
        for ball in balls:
            if ball["sprite"] in hits:
                ball["x_speed"] = 0
                ball["y_speed"] = 0

    updateDisplay()
    tick(30)
