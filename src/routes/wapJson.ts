export interface Root {
	description: Description;
	content: Content[];
}

export interface Description {
	context: string;
	date: string;
	furtherContent: FurtherContent[];
}

export interface FurtherContent {
	text: string;
	url: string;
}

export interface Content {
	context: string;
	chapter: string;
	mainVideo: string;
	ressources: Ressources[];
	sidetexts: SideText[];
	quiz: Quiz[];
	clickables: Clickable[];
	podcast: Podcast[];
}

export interface Ressources {
	text: string;
	url: string;
}

export interface SideText {
    start: string;  // Changed from number to string
    end: string;    // Changed from number to string
    no: number | string;  // Allow both number and string since 'no1' format is used
    text: string;
}

export interface Quiz {
	frage: string;
	antworten: Answer[];
}

export interface Answer {
	text: string;
	wert: number;
}

export interface Clickable {
	text: string;
	target: string;
	url: string;
	color: string;
	frames: Frame[];
}

export interface Frame {
	time: number;
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface Podcast {
	lang: string;
	url: string;
}
