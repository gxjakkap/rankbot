import requests as r

ss = r.get('https://api.henrikdev.xyz/valorant/v1/mmr/ap/armladkrabang/6496')
ans = ss.json()
x = ans['data']['currenttier']
print(x, type(x))