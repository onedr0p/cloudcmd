'use strict';

const tryCatch = require('try-catch');

const noop = (req, res, next) => {
    next && next();
};

noop.listen = noop;

function _getModule(a) {
    return require(a);
}

module.exports = (config, arg, {getModule = _getModule} = {}) => {
    if (!config('terminal'))
        return noop;
    
    const [e, terminalModule] = tryCatch(getModule, config('terminalPath'));
    
    if (!e && !arg)
        return terminalModule;
    
    if (!e)
        return terminalModule(arg);
    
    config('terminal', false);
    console.log(`cloudcmd --terminal: ${e.message}`);
    
    return noop;
};
