import {Module} from "./js/Module";
import {Option, OptionValueLabel} from "./js/Option";

export class TradingModule extends Module{

	static defaultSymbol = 'BINANCE:BTCUSDT';
	static defaultTheme = 'Dark';
	static defaultInterval = '60';
	static defaultTimezone = 'Etc/UTC';
	static defaultHideTopbar = false;
	static defaultHideSidebar = false;
	static defaultStyle = '1';

	symbol : string = TradingModule.defaultSymbol;
	theme : string = TradingModule.defaultTheme;
	interval : string = TradingModule.defaultInterval;
	timezone : string = TradingModule.defaultTimezone;
	hideTopbar : boolean = TradingModule.defaultHideTopbar;
	hideSidebar : boolean = TradingModule.defaultHideSidebar;
	style : boolean = TradingModule.defaultHideSidebar;

	constructor(options:Array<Option>=[]){
		super();
		this.type = 'tradingview';
		this.setOptions(options,false);
	}

	getLink() : string|null{
		if(this.symbol.indexOf('BINANCE:') === 0){
			let currencies = this.symbol.replace('BINANCE:', '');
			return 'https://www.binance.com/tradeDetail.html?symbol='+currencies.substring(0, 3)+'_'+currencies.substring(3);
		}else{
			return 'https://www.tradingview.com/chart/?symbol='+this.symbol;
		}
	}

	static getOptions(): Option[] {
		return [
			new Option('symbol', 'text', 'Symbol', TradingModule.defaultSymbol),
			new Option('theme', 'select', 'Theme', TradingModule.defaultTheme, [new OptionValueLabel('Dark', 'Dark'), new OptionValueLabel('Light', 'Light')]),
			new Option('timezone', 'select', 'Timezone', TradingModule.defaultTimezone, [
				new OptionValueLabel('Etc/UTC', 'UTC'),
				new OptionValueLabel('exchange', 'Exchange'),
				new OptionValueLabel('Pacific/Honolulu', '(UTC-10) Honolulu'),
				new OptionValueLabel('America/Los_Angeles', '(UTC-8) Los Angeles'),
				new OptionValueLabel('America/Vancouver', '(UTC-8) Vancouver'),
				new OptionValueLabel('America/Phoenix', '(UTC-7) Phoenix'),
				new OptionValueLabel('America/Chicago', '(UTC-6) Chicago'),
				new OptionValueLabel('America/Mexico_City', '(UTC-6) Mexico City'),
				new OptionValueLabel('America/El_Salvador', '(UTC-6) San Salvador'),
				new OptionValueLabel('America/Bogota', '(UTC-5) Bogota'),
				new OptionValueLabel('America/New_York', '(UTC-5) New York'),
				new OptionValueLabel('America/Toronto', '(UTC-5) Toronto'),
				new OptionValueLabel('America/Caracas', '(UTC-4) Caracas'),
				new OptionValueLabel('America/Argentina/Buenos_Aires', '(UTC-3) Buenos Aires'),
				new OptionValueLabel('America/Sao_Paulo', '(UTC-2) Sao Paulo'),
				new OptionValueLabel('Europe/London', '(UTC) London'),
				new OptionValueLabel('Europe/Belgrade', '(UTC+1) Belgrade'),
				new OptionValueLabel('Europe/Berlin', '(UTC+1) Berlin'),
				new OptionValueLabel('Europe/Paris', '(UTC+1) Paris'),
				new OptionValueLabel('Europe/Athens', '(UTC+2) Athens'),
				]
			),
			new Option('interval', 'select', 'Interval', TradingModule.defaultInterval, [
				new OptionValueLabel('1', '1 min'),
				new OptionValueLabel('3', '3 min'),
				new OptionValueLabel('5', '5 min'),
				new OptionValueLabel('15', '15 min'),
				new OptionValueLabel('30', '30 min'),
				new OptionValueLabel('60', '1 hour'),
				new OptionValueLabel('120', '2 hours'),
				new OptionValueLabel('180', '3 hours'),
				new OptionValueLabel('240', '4 hours'),
				new OptionValueLabel('D', '1D'),
				new OptionValueLabel('W', '1W'),
				]),
			new Option('hideTopbar', 'check', 'Hide top bar', TradingModule.defaultHideTopbar),
			new Option('hideSidebar', 'check', 'Hide side bar', TradingModule.defaultHideSidebar),
			new Option('style', 'select', 'Style', TradingModule.defaultStyle, [
				new OptionValueLabel('0', 'Bar'),
				new OptionValueLabel('1', 'Candle'),
				new OptionValueLabel('9', 'Hollow candle'),
				new OptionValueLabel('8', 'Heilkin Ashi'),
				new OptionValueLabel('2', 'Line'),
				new OptionValueLabel('3', 'Area'),
				new OptionValueLabel('4', 'Renko'),
				new OptionValueLabel('7', 'Line-break'),
				new OptionValueLabel('5', 'Kagi'),
				new OptionValueLabel('6', 'Point and figures'),
			]),
		]
	}

	setOption(option: Option, refresh=true) {
		if(option.id == 'symbol')	this.symbol = option.value;
		if(option.id == 'theme')	this.theme = option.value;
		if(option.id == 'timezone')	this.timezone = option.value;
		if(option.id == 'interval')	this.interval = option.value;
		if(option.id == 'hideTopbar')	this.hideTopbar = option.value;
		if(option.id == 'hideSidebar')	this.hideSidebar = option.value;
		if(option.id == 'style')	this.style = option.value;
		console.log(option.value);

		if(refresh)this.update();
	}

	update(){
		console.log(this.symbol);
		$('#'+this.uid+'-content').attr('style', function(i:any,s:any) { return s + 'overflow: hidden !important;' });

		let options : any = {
			"container_id":this.uid+'-content',
			"autosize": true,
			"symbol": this.symbol,
			"interval": this.interval,
			"timezone": this.timezone,
			"theme": this.theme,
			"style": this.style,
			"locale": navigator.language || 'en',
			"toolbar_bg": "#f1f3f6",
			"enable_publishing": false,
			"allow_symbol_change": false,
			"show_popup_button": false,
			"hideideas": true,
			"referral_id": "7610"
			/*"details": true,
			"hidevolume":0,
			/*"hotlist": true,
			"calendar": true,*/
			// "logo":"https://www.seoclerk.com/pics/558390-11FO8A1505384509.png"
		};

		if(this.hideTopbar)			options['hide_top_toolbar'] = true;  else options['hide_top_toolbar'] = false;
		console.log(this.hideSidebar);
		if(!this.hideSidebar)		options['hide_side_toolbar'] = false;

		new TradingView.widget(options);
	}
}