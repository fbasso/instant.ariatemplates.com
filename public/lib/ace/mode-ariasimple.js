ace.define("ace/mode/ariasimple",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/ariasimple_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./ariasimple_highlight_rules").AriaSimpleHighlightRules,u=e("./folding/cstyle").FoldMode,a=function(){var e=new o;this.foldingRules=new u,this.$tokenizer=new s(e.getRules())};r.inherits(a,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"}}.call(a.prototype),t.Mode=a}),ace.define("ace/mode/ariasimple_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{todo:"fix grouping",token:["source.template.tpl","support.function.tpl"],regex:"\\{(Template)\\s*",push:[{include:"#tpl-statement"},{include:"#tpl-expression"},{include:"#tpl-keyword"},{include:"#comment"},{todo:"fix grouping",token:["source.template.tpl","support.function.tpl"],regex:"\\{/(Template)\\}",next:"pop"},{defaultToken:"source.template.tpl"}]},{todo:"fix grouping",token:["source.tag.tpl","keyword.tag.tpl"],regex:"</?\\s*(\\w+)",push:[{include:"#tpl-statement"},{include:"#tpl-expression"},{include:"#tpl-keyword"},{include:"#comment"},{token:"source.tag.tpl",regex:">",next:"pop"},{defaultToken:"source.tag.tpl"}]},{todo:"fix grouping",token:["source.widget.tpl","support.function.tpl","keyword.tag.tpl"],regex:"\\{/?\\s*(@\\w+)\\:(\\w+)\\s*",push:[{include:"#tpl-statement"},{include:"#tpl-expression"},{include:"#tpl-keyword"},{include:"#comment"},{token:"source.widget.tpl",regex:"\\}",next:"pop"},{defaultToken:"source.widget.tpl"}]},{todo:"fix grouping",token:["source.macro.begin.tpl","support.function.tpl","source.macro.begin.tpl","variable.parameter.function.tpl"],regex:"\\{(macro)\\s+([a-zA-Z_$]\\w*)\\s*\\((.*?)\\)\\s*\\}"},{include:"#tpl-statement"},{include:"#tpl-expression"},{include:"#tpl-keyword"},{include:"#comment"}],"#tpl-basic-keyword":[{token:"storage.tag.tpl",regex:"\\b(data|bind|bindRefreshTo|bindProcessingTo|to|inside|inArray|inView|inSortedView)\\b"}],"#tpl-expression":[{token:"constant.other.tpl",regex:"\\$\\{.*?(\\})(?=[^\\}]*($|\\{|//))"}],"#tpl-fwk-keyword":[{token:"storage.tag.tpl",regex:"\\$\\w+"}],"#tpl-keyword":[{include:"#tpl-basic-keyword"},{include:"#tpl-fwk-keyword"}],"#tpl-statement":[{todo:"fix grouping",token:["text","support.function.tpl"],regex:"\\{/?\\s*(\\w+)\\b",push:[{include:"#tpl-keyword"},{token:"text",regex:"\\}",next:"pop"}]}]},this.normalizeRules()};r.inherits(s,i),t.AriaSimpleHighlightRules=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(){};r.inherits(o,s),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n){var r=e.getLine(n),i=r.match(this.foldingStartMarker);if(i){var s=i.index;return i[1]?this.openingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s+i[0].length,1)}if(t!=="markbeginend")return;var i=r.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s,-1)}}}.call(o.prototype)})