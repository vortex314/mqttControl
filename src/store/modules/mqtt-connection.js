
export default {
    state: () => ({
        host: 'test.mosquitto.org',
        port: 8081,
        connected: false,
    }),
    getters: {
        connected: state => state.connected,
        port: state => state.port,
        host: state => state.host,
    },
    actions: {
        connect(context) {
            console.log(context) // perform MQTT connect 
            context.commit('CONNECTED', true)
        },
        disconnect(context) {
            console.log(context) // perform MQTT connect 
            context.commit('CONNECTED', false)
        }
    },
    mutations: {
        CONNECTED(state, newVal) {
            state.connected = newVal
        }
    }

}
