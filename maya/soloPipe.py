from PySide2 import QtCore, QtGui, QtWidgets
from shiboken2 import wrapInstance


import maya.OpenMayaUI as omui
import maya.cmds as cmds
import os
import requests
import json


def maya_main_window():
    main_window_ptr = omui.MQtUtil.mainWindow()
    return wrapInstance(long(main_window_ptr), QtWidgets.QWidget)


class gSubmission(QtWidgets.QMainWindow):

    def __init__(self, mayaMain=maya_main_window()):
        super(gSubmission, self).__init__(mayaMain)

        self.setWindowTitle("Solo Pipe Model Submission")
        self.setMinimumWidth(400)
        self.setMinimumHeight(400)

        self.jwt = ''
        self.response = []
        self.clients = []
        self.projects = []
        self.assets = []

        # StackedWidget Setup

        self.stackedWidget = QtWidgets.QStackedWidget()
        self.setCentralWidget(self.stackedWidget)

        loginPage = QtWidgets.QWidget()
        submissionPage = QtWidgets.QWidget()

        self.stackedWidget.addWidget(loginPage)
        self.stackedWidget.addWidget(submissionPage)

        # Login Page Layout

        loginLayout = QtWidgets.QHBoxLayout(loginPage)

        label = QtWidgets.QLabel()

        login = QtWidgets.QVBoxLayout()

        self.username = QtWidgets.QLineEdit()
        self.username.setPlaceholderText("Username")
        self.username.setMaximumWidth(200)
        self.password = QtWidgets.QLineEdit()
        self.password.setPlaceholderText("Password")

        self.password.setMaximumWidth(200)
        self.password.setEchoMode(QtWidgets.QLineEdit.EchoMode.Password)
        submit = QtWidgets.QPushButton("Login")
        submit.setMaximumWidth(200)
        submit.clicked.connect(self.login)

        self.errorMessage = QtWidgets.QLabel('')

        login.addStretch()
        login.addWidget(label)
        login.addWidget(self.username)
        login.addWidget(self.password)
        login.addWidget(submit)
        login.addWidget(self.errorMessage)
        login.addStretch()

        loginLayout.addStretch()
        loginLayout.addLayout(login)
        loginLayout.addStretch()

        # submission Layout

        submissionWrap = QtWidgets.QVBoxLayout(submissionPage)
        submissionLayout = QtWidgets.QHBoxLayout()

        submissionWrap.addLayout(submissionLayout)

        # Widgets

        # Dropdowns
        self.clientDropdown = QtWidgets.QComboBox()
        self.clientDropdown.lineEdit()
        self.projectDropdown = QtWidgets.QComboBox()
        self.assetDropdown = QtWidgets.QComboBox()

        # Labels
        clientLabel = QtWidgets.QLabel('Client: ')
        projectLabel = QtWidgets.QLabel('Project: ')
        assetLabel = QtWidgets.QLabel('Asset: ')

        # Buttons
        sep = QtWidgets.QFrame()
        logout = QtWidgets.QPushButton("Log out")
        submit = QtWidgets.QPushButton("Submit")
        submit.clicked.connect(self.submit)
        logout.clicked.connect(self.logout)

        self.report = QtWidgets.QPlainTextEdit()

        # Submission layout
        submissionLayout
        submissionLayout.addWidget(self.clientDropdown)
        submissionWrap.addWidget(self.report)

        submissionWrap.addWidget(submit)
        submissionWrap.addWidget(sep)
        submissionWrap.addWidget(logout)

    def login(self):

        url = "http://localhost:3000/api/mayaLogin"

        payload = {}
        payload['username'] = self.username.text()
        payload['password'] = self.password.text()

        def sendCredentiels():
            fullname = cmds.file(query=True, sceneName=True)
            files = {'upload_file': open(fullname, 'rb')}
            result = requests.post(url, json=payload)

            if (result.status_code == 200):
                self.response = json.loads(result.text)
                self.jwt = self.response['JWT']
                print self.response
                for object in self.response['res']:
                    if object['company'] not in self.clients:
                        self.clients.append(object['company'])

                for client in self.clients:
                    self.clientDropdown.addItem(client)
                self.stackedWidget.setCurrentIndex(1)
            else:
                self.errorMessage.setText('Wrong Credentiels')

        sendCredentiels()

    def logout(self):
        self.stackedWidget.setCurrentIndex(0)
        self.jwt = ''

    def submit(self):
        print 'Hello there'


if __name__ == "__main__":

    try:
        ui.close()
    except:
        pass
    ui = gSubmission()
    ui.show()
