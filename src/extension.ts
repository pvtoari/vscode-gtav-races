import * as vscode from "vscode";

const urls = [
	"https://yewtu.be/latest_version?id=XrD4GlrLWwc#t=19", //youtube video link doesnt work kauman
	"https://yewtu.be/latest_version?id=5mCyFu2JCIE#t=20",
	"https://yewtu.be/latest_version?id=Csrt-5lNdgs#t=10",
	"https://yewtu.be/latest_version?id=PiqfEh239Z8#t=14",
	"https://yewtu.be/latest_version?id=ZtLrNBdXT7M#t=4"
	// U can add more videos here
];

const getRandomUrl = () => {
	const randomIndex = Math.floor(Math.random() * urls.length);
	return urls[randomIndex];
};

const getWebviewContent = (url: string) => `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			<style>
				body {
					height: 100vh;
					display: grid;
					overflow: hidden;
					place-items: center;
				}

				video {
					transform: scale(3);
					clip-path: polygon(
						33.33% 0%,
						66.67% 0%,
						66.67% 100%,
						33.33% 100%
					);
				}
			</style>
		</head>
		<body>
			<video autoplay muted>
				<source src="${url}" />
			</video>
		</body>
	</html>
`;

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"gtav-races.dopamine",
		() => {
			const panel = vscode.window.createWebviewPanel(
				"gtav-races.video",
				"Dopamine for your brain!",
				{ viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
				{ enableScripts: true }
			);

			const randomUrl = getRandomUrl();
			panel.webview.html = getWebviewContent(randomUrl);
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
