import maya.cmds as cmds
import os
import requests
import json

admin = 'jake'
password = '1234'

url = "http://localhost:3000/api/upload"

headers = {}

headers['username'] = admin
headers['password'] = password


def sendFile():
    fullname = cmds.file(query=True, sceneName=True)
    files = {'upload_file': open(fullname, 'rb')}
    result = requests.post(url, files=files, headers=headers)
    if (result.status_code == 200):
        responseData = json.loads(result.text)


sendFile()
