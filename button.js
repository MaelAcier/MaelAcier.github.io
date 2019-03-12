class Button {
    constructor(p5obj,name,size,x,y,fun) {
        let button = p5obj.createButton('')
        button.position(x, y);
        button.class("uk-button uk-button-text")
        button.id(name)
        button.mousePressed(fun)

        let icon = p5obj.createSpan('')
        icon.class('uk-icon uk-icon-image')
        icon.style(`background-image: url('images/${name}.png'); height: ${size}px; width: ${size}px`)
        icon.parent(name)
    }
}
