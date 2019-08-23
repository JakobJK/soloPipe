import maya.cmds as cmds
import os
import requests
import json

url = "http://localhost:3000/api/upload"


def sendFile():
    fullname = cmds.file(query=True, sceneName=True)
    files = {'upload_file': open(fullname, 'rb')}
    result = requests.post(url, files=files)
    if (result.status_code == 200):
        responseData = json.loads(result.text)


sendFile()
