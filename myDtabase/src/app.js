var app = app || {};
var qad = window.qad || {};
app.AppView = joint.mvc.View.extend({
    el: '#app',
    events: {
        'click nav .add-question': 'addQuestion',
        'click nav .code-snippet': 'showCodeSnippet',
    },
    init: function () {
        this.initializePaper();
        this.initializeSelection();
        this.initializeHalo();
        this.initializeInlineTextEditor();
    },
    initializeInlineTextEditor: function () {
        var cellViewUnderEdit;
        var closeEditor = _.bind(function () {
            if (this.textEditor) {
                this.textEditor.remove();
                // Re-enable dragging after inline editing.
                cellViewUnderEdit.setInteractivity(true);
                this.textEditor = cellViewUnderEdit = undefined;
            }
        }, this);
        this.paper.on('cell:pointerdblclick', function (cellView, evt) {
            // Clean up the old text editor if there was one.
            closeEditor();
            var vTarget = V(evt.target);
            var text;
            var cell = cellView.model;

            switch (cell.get('type')) {
                case 'qad.Question':

                    text = joint.ui.TextEditor.getTextElement(evt.target);
                    if (!text) {
                        break;
                    }
                    if (vTarget.hasClass('body') || V(text).hasClass('question-text')) {
                        text = cellView.$('.question-text')[0];
                        cellView.textEditPath = 'question';
                        cellView.optionId = null;
                    } else if (V(text).hasClass('option-text')) {
                        cellView.textEditPath = 'options/' + _.findIndex(cell.get('options'), { id: V(text.parentNode).attr('option-id') }) + '/text';
                        cellView.optionId = V(text.parentNode).attr('option-id');
                    } else if (vTarget.hasClass('option-rect')) {
                        text = V(vTarget.node.parentNode).find('.option-text');
                        cellView.textEditPath = 'options/' + _.findIndex(cell.get('options'), { id: V(vTarget.node.parentNode).attr('option-id') }) + '/text';
                    }
                    break;
            }

            if (text) {
                this.textEditor = new joint.ui.TextEditor({ text: text });
                this.textEditor.render(this.paper.el);
                this.textEditor.on('text:change', function (newText) {
                    var cell = cellViewUnderEdit.model;
                    cell.prop(cellViewUnderEdit.textEditPath, newText);
                    if (cellViewUnderEdit.optionId) {
                        this.textEditor.options.text = cellViewUnderEdit.$('.option.option-' + cellViewUnderEdit.optionId + ' .option-text')[0];
                    }

                }, this);

                cellViewUnderEdit = cellView;
                // Prevent dragging during inline editing.
                cellViewUnderEdit.setInteractivity(false);
            }
        }, this);

        $(document.body).on('click', _.bind(function (evt) {

            var text = joint.ui.TextEditor.getTextElement(evt.target);
            if (this.textEditor && !text) {
                closeEditor();
            }

        }, this));
    },
    initializeHalo: function () {
        this.paper.on('element:pointerup', function (elementView, evt) {
            var halo = new joint.ui.Halo({
                boxContent: `<pre>${JSON.stringify(this.selection.first().get("options"), null, 2)}</pre>`,
                cellView: elementView,
                useModelGeometry: true,
                type: 'toolbar'
            });
            halo.removeHandle('rotate')
                .removeHandle('resize')
                .render()
        }, this);
    },
    initializeSelection: function () {

        var paper = this.paper;
        var graph = this.graph;
        var selection = this.selection = new app.Selection;

        selection.on('add reset', function () {
            var cell = this.selection.first();
            if (cell) {
                this.status('Selection: ' + cell.get('name'));
            } else {
                this.status('Selection emptied.');
            }
        }, this);

        paper.on({
            'element:pointerup': function (elementView) {
                this.selection.reset([elementView.model]);
            },
            'blank:pointerdown': function () {
                this.selection.reset([]);
            }
        }, this);

        paper.on('element:pointerdblclick', function () {
            console.log("su");
        }, this);

        graph.on('remove', function () {
            this.selection.reset([]);
        }, this);

        new app.SelectionView({
            model: selection,
            paper: paper
        });

        document.body.addEventListener('keydown', _.bind(function (evt) {

            var code = evt.which || evt.keyCode;
            // Do not remove the element with backspace if we're in inline text editing.
            if ((code === 8 || code === 46) && !this.textEditor && !this.selection.isEmpty()) {
                this.selection.first().remove();
                this.selection.reset([]);
                return false;
            }

            return true;

        }, this), false);
    },
    initializePaper: function () {
        this.paper = new joint.dia.Paper({
            el: this.$('#paper'),
            width: 800,
            height: 600,
            gridSize: 10,
            snapLinks: {
                radius: 75
            },
            linkPinning: false,
            multiLinks: false,
            defaultLink: app.Factory.createLink(),
            defaultRouter: { name: 'manhattan', args: { padding: 20 } },
            defaultConnector: { name: 'rounded' },
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                if (magnetT && magnetT.getAttribute('port-group') === 'out') return false;
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                if (cellViewS === cellViewT) return false;
                return (magnetT && magnetT.getAttribute('port-group') === 'in') || (cellViewS.model.get('type') === 'qad.Question');
            },
            validateMagnet: function (cellView, magnet) {
                return magnet.getAttribute('magnet') !== 'passive';
            }
        });
        this.graph = this.paper.model;
    },
    status: function (m) {
        this.$('#statusbar .message').text(m);
    },
    addQuestion: function () {
        app.Factory.createQuestion('Table ' + (this.graph.getCells().length + 1)).addTo(this.graph);
        this.status('Table added.');
    },
    showCodeSnippet: function () {
        var cell = this.selection.first();
        var dialogJSON = app.Factory.createDialogJSON(this.graph, cell);
        console.log(dialogJSON);
        console.log(this.graph.toJSON());
    },
    loadExample: function (data) {
        this.selection.reset([]);
        this.graph.fromJSON(data);
    },
    clear: function () {
        this.graph.clear();
    },
    save() {
        return this.graph.toJSON()
    }
});
function format(root) {
    let tables = [];
    root.cells.forEach(cell => {
        switch (cell.type) {
            case "qad.Question":
                let table = {
                    name: node.name,
                    data: []
                }
                tables.push(table);
                break;
            default:

                break;
        }
    });
}