'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('yarn');
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`${chalk.blue('BetterDiscord')} plugin generator`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'pluginName',
        message: 'Your plugin name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Plugin description',
        default: `${this.appname}'s BetterDiscord plugin`
      },
      {
        type: 'input',
        name: 'version',
        message: 'pluginVersion',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Plugin repository'
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Plugin homepage'
      },
      {
        type: 'confirm',
        name: 'reloadable',
        message: 'Reloadable?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('./**/!(config.json|package.json)'),
      this.destinationPath()
    );
    this.fs.copyTpl(
      this.templatePath('plugin/config.json'),
      this.destinationPath('plugin/config.json'),
      {
        pluginName: this.props.pluginName,
        author: this.props.author,
        description: this.props.description,
        version: this.props.pluginVersion,
        repository: this.props.repository,
        homepage: this.props.homepage,
        reloadable: this.props.reloadable
      }
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        pluginName: this.props.pluginName,
        author: this.props.author,
        description: this.props.description,
        version: this.props.pluginVersion,
        repository: this.props.repository,
        homepage: this.props.homepage,
        reloadable: this.props.reloadable
      }
    );
  }

  install() {
    if (this.options.yarn) {
      this.yarnInstall();      
    } else {
      this.npmInstall();    
    }
  }
};
