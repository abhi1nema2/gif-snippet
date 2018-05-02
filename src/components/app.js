import React, {Component, Fragment} from 'react';
import AceEditor from 'react-ace';
import domtoimage from '../utils/domToCanvas';

import "brace/ext/language_tools";
import "brace/ext/searchbox";
import "brace/keybinding/vim";

import "brace/mode/css";
import "brace/mode/javascript";
import "brace/mode/less";
import "brace/mode/html";
import "brace/snippets/css";
import "brace/snippets/less";
import "brace/snippets/html";

import "brace/theme/github";
import "brace/theme/monokai";
import "brace/theme/tomorrow";
import "brace/theme/kuroir";
import "brace/theme/twilight";
import "brace/theme/xcode";
import "brace/theme/textmate";
import "brace/theme/solarized_dark";
import "brace/theme/terminal";
import "brace/theme/solarized_light";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            mode: 'javascript',
            theme: 'monokai',
        };
        this.gif = new GIF({
            workers: 2,
            quality: 10,
            repeat: props.repeat || 0,
            quality: props.quality || 10
        });
        this.editorHeight = window.screen.height * 0.6,
        this.editorWidth = window.screen.width * 0.8
        this.themeFiles = ['ambiance','chaos','chrome','clouds','clouds_midnight','cobalt',
                        +'crimson_editor','dawn','dracula','dreamweaver','eclipse','github',
                        +'gob','gruvbox','idle_fingers','iplastic','katzenmilch','kr_theme',
                        +'kuroir','merbivore','merbivore_soft','monokai','mono_industrial',
                        +'pastel_on_dark','solarized_dark','solarized_light',
                        +'sqlserver','terminal','textmate','tomorrow','tomorrow_night',
                        +'tomorrow_night_blue','tomorrow_night_bright','tomorrow_night_eighties',
                        +'twilight','vibrant_ink','xcode'];

        this.modeFiles = ['abap','abc','actionscript','ada','apache_conf','applescript','asciidoc','assembly_x86',
        +'autohotkey','batchfile','bro','c9search','cirru','clojure','cobol','coffee','coldfusion','csharp',
        +'csound_document','csound_orchestra','csound_score','css','curly','c_cpp','d','dart','diff','django',
        +'dockerfile','dot','drools','eiffel','ejs','elixir','elm','erlang','forth','fortran','ftl','gcode','gherkin',
        +'gitignore','glsl','gobstones','golang','graphqlschema','groovy','haml','handlebars','haskell','haskell_cabal',
        +'haxe','hjson','html','html_elixir','html_ruby','ini','io','jack','jade','java','javascript','json','jsoniq',
        +'jsp','jssm','jsx','julia','kotlin','latex','lean','less','liquid','lisp','livescript','live_script','logiql',
        +'lsl','lua','luapage','lucene','makefile','markdown','mask','matlab','mavens_mate_log','maze','mel',
        +'mipsassembler','mips_assembler','mushcode','mysql','nix','nsis','objectivec','ocaml','pascal','perl',
        +'pgsql','php','pig','plain_text','powershell','praat','prolog','properties','protobuf','python','r','razor',
        +'rdoc','red','rhtml','rst','ruby','rust','sass','scad','scala','scheme','scss','sh','sjs','smarty','snippets',
        +'soy_template','space','sparql','sql','sqlserver','stylus','svg','swift','swig','tcl','tex','text','textile',
        +'toml','tsx','turtle','twig','typescript','vala','vbscript','velocity','verilog','vhdl','wollok','xml',
        +'xquery','yaml'];
    }

    getGif = () => {
        domtoimage.toCanvas(document.querySelector("#capture"))
        .then(async(canvas) => {
            this.gif.addFrame(canvas);
            this.gif.on('finished', (blob) => {
                const image = URL.createObjectURL(blob);
                this.setState({
                    imageSrc: image
                });
            });
            this.gif.render();
            while(!document.querySelector(".subContainer__outputContainer")) {
                await new Promise(r => setTimeout(r, 500));
            }
            const scrollIntoViewElement = document.querySelector(".subContainer__outputContainer");
            scrollIntoViewElement.scrollIntoView({ block: 'end',  behavior: 'smooth' });
        })
        .catch((error) => {
            console.error('oops, something went wrong!', error);
        });
    }

    onModeChange = (e) => {
        const { value } = e.target;
        this.setState({ mode: value });
      }

    onThemeChange = (e) => {
        const { value } = e.target;
        this.setState({ theme: value });
    }

    updateCode = async (newCode, obj) => {
        const node = document.querySelector("#capture");
        const { lines, start, end, action } = obj;
        if(((String(lines[0]).trim().length === 0) || (lines[0] === '.') || (lines[0] === ',') || (obj.lines[0] === ';'))) {
            domtoimage.toCanvas(node)
            .then((canvas) => {
                this.gif.addFrame(canvas);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
        this.setState({
            code: newCode
        });
    }

    onSelectChange = (e) => {
        this.setState({
            selectValue:e.target.value
        })
    }

	render () {
        const { imageSrc, selectValue, code, theme, mode } = this.state;

            let themeOptions = this.themeFiles.map((item,index) => {
                return <option key={index} value={item}>{item}</option>
            })

            let modeOptions = this.modeFiles.map((item,index) => {
                return <option key={index} value={item}>{item}</option>
            })

            let delaySeconds = [];
            for(let i=0.1;i<1;i+=0.1){
                delaySeconds.push(i.toFixed(1))
            }
            let delayOptions = delaySeconds.map((item,index) => {
                return <option key={index} value={item}>{`${item}s`}</option>
            })


		return (
                <div className="container">
                    <h1 className="container__header">Gif Snippet</h1>
                    <div className="subContainer">
                        <div className = "subContainer__inputContainer">
                            <div className="subContainer__customizeOptions">
                                <select className="subContainer__customizeOptions__dropdown" onChange={this.onSelectChange} value={selectValue}>
                                    {delayOptions}
                                </select>
                                <select
                                    style={{ paddingLeft: "15px", paddingRight: "11px" }}
                                    name={`${name}.codeEditorTheme`}
                                    placeholder="Theme"
                                    value={theme}
                                    onChange={this.onThemeChange}
                                    className="subContainer__customizeOptions__dropdown"
                                >
                                    {themeOptions}
                                </select>
                                <select
                                    style={{ paddingLeft: "15px", paddingRight: "11px" }}
                                    name={`${name}.codeEditorTheme`}
                                    placeholder="Theme"
                                    value={mode}
                                    onChange={this.onModeChange}
                                    className="subContainer__customizeOptions__dropdown"
                                >
                                   {modeOptions}
                                </select>
                                <button className="subContainer__button" onClick={this.getGif} >Get gifs</button>
                            </div>
                            <div id="capture" className="subContainer__inputTextArea">
                                <AceEditor
                                    mode={mode}
                                    theme={theme}
                                    value={code}
                                    onChange={this.updateCode}
                                    name="UNIQUE_ID_OF_DIV"
                                    fontSize={30}
                                    focus={true}
                                    className="aceEditor"
                                    width={`${this.editorWidth}px`}
                                    height={`${this.editorHeight}px`}
                                    editorProps={{$blockScrolling: true}}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: false,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                        wrapBehavioursEnabled: true,
                                        wrap: true,
                                        useSoftTabs: true
                                    }}
                                    editorProps={{$blockScrolling: true}}
                                />
                            </div>
                        </div>
                        {imageSrc && (
                            <div className="subContainer__outputContainer">
                                <a className="subContainer__button" href={imageSrc} download="snippet.gif">Download</a>
                                <img className="subContainer__outputContainer__img" src={imageSrc}  ref={(element) => { this.outputContainer = element; }}/>
                            </div>
                        )}
                    </div>
                </div>
		);
	}
}
