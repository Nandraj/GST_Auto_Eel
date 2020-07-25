# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

import os

path = os.path.abspath(".")

a = Analysis(['main.py'],
             pathex=[path],
             binaries=[],
             datas=[('C:\\Users\\Admin\\AppData\\Local\\Programs\\Python\\Python37-32\\Lib\\site-packages\\eel\\eel.js', 'eel'), ('web', 'web'), ('D:\\Desktop_Files\\chromedriver.exe', '.'), ('N.ico', '.'), ('db', 'db')],
             hiddenimports=['bottle_websocket'],
             hookspath=[],
             runtime_hooks=[],
             excludes=['numpy', 'django', 'PyQt5'],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='GST Auto 2.0.1',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=False,
          icon='N.ico' )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='GST Auto 2.0.1')
