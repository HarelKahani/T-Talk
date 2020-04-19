import time
import pygame
import random

width = 700
height = 700
apple_w = 20
apple_h = 20
window = pygame.display.set_mode(size=(width, height))
pygame.display.set_caption("My Game")


class Apple:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.width = apple_w
        self.height = apple_h
        self.rect = (self.x, self.y, self.width, self.height)
        self.color = (0, 255, 0)

    def draw_object(self, win):
        pygame.draw.rect(win, self.color, self.rect)


class Player:
    def __init__(self, x, y, r, c):
        self.x = x
        self.y = y
        self.radius = r
        self.color = c
        self.color2 = (0, 0, 0)
        self.move_val = 3
        self.right = True
        self.left = False
        self.up = False
        self.down = False

    def draw_object(self, win):
        fish = pygame.image.load("sea.png")
        win.blit(fish, (self.x, self.y))
        # pygame.draw.circle(win, self.color, (self.x, self.y), self.radius)
        # pygame.draw.circle(win, self.color2, (self.x, self.y), self.radius // 2)

    def reduce_size(self):
        self.radius -= self.move_val * 4

    def move(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            change = self.x - self.move_val
            if 0 < change < height - 128 or 0 < change < width - 128:
                self.x = change
        if keys[pygame.K_RIGHT]:
            change = self.x + self.move_val
            if 0 < change < height - 128 or 0 < change < width - 128:
                self.x = change
        if keys[pygame.K_UP]:
            change = self.y - self.move_val
            if 0 < change < height - 128 or 0 < change < width - 128:
                self.y = change
        if keys[pygame.K_DOWN]:
            change = self.y + self.move_val
            if 0 < change < height - 128 or 0 < change < width - 128:
                self.y = change


def redraw_window(win, player, apple):
    win.fill((0, 0, 250))
    player.draw_object(win)
    apple.draw_object(window)
    if check_touch(player, apple):
        apple = Apple(random.randrange(10, 690), random.randrange(10, 690))
        apple.draw_object(win)
        player.reduce_size()
    pygame.display.update()
    return apple


def check_touch(player, apple):
    retval = False
    # x_range = range(player.x - player.radius // 2, player.x + player.radius // 2)
    # y_range = range(player.y - player.radius // 2, player.y + player.radius // 2)
    x_range = range(player.x, player.x + 128)
    y_range = range(player.y, player.y + 128)
    if (apple.x in x_range) and (apple.y in y_range):
        retval = True
    return retval


def main():
    running = True
    player1 = Player(50, 50, 100, (255, 0, 0))
    apple = Apple(500, 500)
    # check_touch(player1,apple)
    # exit()

    while running:
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                running = False
                pygame.quit()

        player1.move()
        apple = redraw_window(window, player1, apple)
        if player1.radius <= 5:
            window.fill((0, 0, 0))
            player1 = None
            apple = None
            pygame.display.update()
            time.sleep(5)
            running = False


main()
