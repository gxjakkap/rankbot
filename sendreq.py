import requests
import settings


def valapiget(address):
    header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"}
    r = requests.get(address, headers=header)
    r.encoding = 'utf-8'
    return r.json()


def valapipost(address, body):
    header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"}
    r = requests.post(address, headers=header, json=body)
    r.encoding = 'utf-8'
    return r.json()


def apexapiget(address):
    header = {"Authorization": settings.APEXKEY,
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"}
    r = requests.get(address, headers=header)
    r.encoding = 'utf-8'
    return r.json()
