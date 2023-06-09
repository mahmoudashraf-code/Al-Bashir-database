var qad = window.qad || {};

qad.renderDialog = function(dialog, node) {

    this.dialog = dialog;

    if (!node) {

        for (var i = 0; i < dialog.nodes.length; i++) {

            if (dialog.nodes[i].id === dialog.root) {

                node = dialog.nodes[i];
                break;
            }
        }
    }

    if (!node) {

        throw new Error('It is not clear where to go next.');
    }

    if (!this.el) {
        this.el = this.createElement('div', 'qad-dialog');
    }

    // Empty previously rendered dialog.
    this.el.textContent = '';

    switch (node.type) {
        case 'qad.Question':
            this.renderQuestion(node);
            break;
    }

    this.currentNode = node;

    return this.el;
};

qad.createElement = function(tagName, className) {

    var el = document.createElement(tagName);
    el.setAttribute('class', className);
    return el;
};

qad.renderOption = function(option) {

    var elOption = this.createElement('button', 'qad-option qad-button');
    elOption.textContent = option.text;
    elOption.setAttribute('data-option-id', option.id);

    var self = this;
    elOption.addEventListener('click', function(evt) {

        self.onOptionClick(evt);

    }, false);

    return elOption;
};

qad.renderQuestion = function(node) {

    var elContent = this.createElement('div', 'qad-content');
    var elOptions = this.createElement('div', 'qad-options');

    for (var i = 0; i < node.options.length; i++) {

        elOptions.appendChild(this.renderOption(node.options[i]));
    }

    var elQuestion = this.createElement('h3', 'qad-question-header');
    elQuestion.innerHTML = node.name;

    elContent.appendChild(elQuestion);
    elContent.appendChild(elOptions);

    this.el.appendChild(elContent);
};

qad.renderAnswer = function(node) {

    var elContent = this.createElement('div', 'qad-content');
    var elAnswer = this.createElement('h3', 'qad-answer-header');
    elAnswer.innerHTML = node.answer;

    elContent.appendChild(elAnswer);
    this.el.appendChild(elContent);
};

qad.onOptionClick = function(evt) {

    var elOption = evt.target;
    var optionId = elOption.getAttribute('data-option-id');

    var outboundLink;
    for (var i = 0; i < this.dialog.links.length; i++) {

        var link = this.dialog.links[i];
        if (link.source.id === this.currentNode.id && link.source.port === optionId) {

            outboundLink = link;
            break;
        }
    }

    if (outboundLink) {

        var nextNode;
        for (var j = 0; j < this.dialog.nodes.length; j++) {

            var node = this.dialog.nodes[j];
            if (node.id === outboundLink.target.id) {

                nextNode = node;
                break;
            }
        }

        if (nextNode) {

            this.renderDialog(this.dialog, nextNode);
        }
    }
};
