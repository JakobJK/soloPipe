from PySide2 import QtCore, QtGui, QtWidgets
from shiboken2 import wrapInstance
import maya.OpenMayaUI as omui
import maya.cmds as cmds
import os
import urllib2
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
        loading = QtWidgets.QWidget()

        self.stackedWidget.addWidget(loginPage)
        self.stackedWidget.addWidget(submissionPage)
        self.stackedWidget.addWidget(loading)
        # Login Page Layout

        loginLayout = QtWidgets.QHBoxLayout(loginPage)

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
        submissionLayout.addWidget(QtWidgets.QLabel('Client: '))
        submissionLayout.addWidget(self.clientDropdown)
        submissionWrap.addWidget(QtWidgets.QLabel('Report:'))
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
            data = json.dumps(payload)
            req = urllib2.Request(
                url, data, {'Content-Type': 'application/json'})
            try:
                f = urllib2.urlopen(req)
                JSONresponse = f.read()
                self.response = json.loads(JSONresponse)

                for object in self.response['res']:
                    if object['company'] not in self.clients:
                        self.clients.append(object['company'])
                self.clientDropdown.clear()
                for client in self.clients:
                    self.clientDropdown.addItem(client)
                self.stackedWidget.setCurrentIndex(1)
                f.close()
            except urllib2.HTTPError, e:
                self.errorMessage.setText('Wrong credentiels')
            except urllib2.URLError, e:
                self.errorMessage.setText('No response from server')

        sendCredentiels()

    def logout(self):
        self.jwt = ''
        self.errorMessage.setText('')
        self.stackedWidget.setCurrentIndex(0)

    def submit(self):
        print 'Hello there'


if __name__ == "__main__":

    try:
        ui.close()
    except:
        pass
    ui = gSubmission()
    ui.show()
