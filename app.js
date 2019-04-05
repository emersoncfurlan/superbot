const bots = {
    input: require('./bots/input').trends,
    text: require('./bots/text'),
    state: require('./bots/state'),
    audio: require('./bots/audio'),
    image: require('./bots/images')
}

start();

async function start() {
    await bots.input();
    await bots.text();
    await bots.image();
    await bots.audio();
    
    const content = bots.state.load()

    console.dir(content, { depth: null });
}
