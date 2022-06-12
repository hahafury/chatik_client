import {BrowserWindow, app, ipcMain, remote} from "electron";
import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from "electron-devtools-installer";
const isDev = process.env.NODE_ENV === "development";

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
	mainWindow = new BrowserWindow({
		// icon: path.join(assetsPath, 'assets', 'icon.png'),
		minWidth : 1100,
		minHeight: 700,
		backgroundColor: '#191622',
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: true,
			webSecurity: false,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	})

	if (isDev) {
		mainWindow.webContents.once("dom-ready", async () => {
			await installExtension(REDUX_DEVTOOLS)
				.then((name: string) => console.log(`Added Extension:  ${name}`))
				.catch((err: any) => console.log("An error occurred: ", err))
				.finally(() => {
					mainWindow?.webContents.openDevTools();
				});
		});
	}

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

async function registerListeners() {
	/**
	 * This comes from bridge integration, check bridge.ts
	 */
	ipcMain.on('message', (_, message) => {
		console.log(_, message);
	})
}

app.on('ready', createWindow)
	.whenReady()
	.then(registerListeners)
	.catch(e => console.error(e))

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
})
