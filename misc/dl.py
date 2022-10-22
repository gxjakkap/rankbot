"""
Script for downloading rank image from VALORANT API.

THIS FILE IS EXCLUSIVELY LICENSED UNDER Attribution-ShareAlike 3.0 Unported
https://creativecommons.org/licenses/by-sa/3.0/

Original by Vlad Bezden on https://stackoverflow.com/a/37821542/16130802

"""

import requests


def save_img(i):
    img_data = requests.get(
        f"https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/{i}/largeicon.png", stream=True).content
    with open(f'{i}.png', 'wb') as handler:
        handler.write(img_data)


i = 0
for i in range(28):
    save_img(i)
