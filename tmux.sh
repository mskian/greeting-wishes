if ! tmux has-session -t wishes 2>/dev/null; then
    tmux new-session -d -s wishes 'node $HOME/greeting-wishes/dist/server.js'
fi