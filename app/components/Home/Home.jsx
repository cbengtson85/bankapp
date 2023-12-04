import React from 'react';

const slideShowTimeout = 25 * 1000;

const imgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    bottom: 0,
    left: 0,
    margin: 'auto',
    overflow: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    objectFit: 'contain'
}

const fadeOut = {
    opacity: 0.1,
    transition: 'visibility 0s 0.3s, opacity 0.3s linear'
}

const fadeIn = {
    visibility: 'visible',
    opacity: 1,
    transition: 'opacity 0.6s linear'
}



const hide = {
    visibility: 'hidden'
}


class Home extends React.Component {

    interval = null;

    timeout = null;

    constructor(props) {
        super(props);
        this.state = {
            picList: [],
            picIndex: 0,
            addFade: false
        }
    }

    handleAdvance = (shouldNotSetUp) => {
        clearTimeout(this.timeout);
 
        this.timeout = setTimeout(() => {
            this.setState((prevState) => ({ 
                picIndex: prevState.picIndex + 1 ,
                addFade: false
            }))
            if(!shouldNotSetUp) {
                this.setUpInterval();
            }
        }, 400);

        this.setState({addFade: true})
        
    }

    handleVideoEnd = () => {
        setTimeout(() => {
            if(this.state.picIndex < this.state.picList.length) {
                this.handleAdvance()
            }
        }, 4000);
    }

    handleVideoStart = () => {
        clearInterval(this.interval);
    }

    handleKeyUp = (e) => {
        if(e.which == 39) {
            console.log(555, this.state.picIndex);
            
            if(this.state.picIndex < this.state.picList.length) {
                this.handleAdvance()
            }
        }
        if(e.which == 37) {
            if(this.state.picIndex > 0) {
                this.setState((prevState) => ({ 
                    picIndex: prevState.picIndex - 1 
                }))
                this.setUpInterval();
            }
        }
        
    }

    setUpInterval = () => {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if(this.state.picIndex < this.state.picList.length) {
                this.handleAdvance(true)
            }
        }, slideShowTimeout);
    }
    componentDidMount() {
        const fetchPromise = fetch('/pics?test=' + Math.random());
        fetchPromise.then(response => {
            const res = response.json();
            res.then(picResponse => {
                this.setState({
                    picList: picResponse.files
                })
                this.setUpInterval()
            })
        });

        addEventListener('keyup', this.handleKeyUp);
    }

    componentDidUpdate() {
        console.log(888888, this.state.picIndex, this.state.picList.length);
        
        if(this.state.picIndex >= this.state.picList.length) {
            location.reload();
        }
    }

    isImage = (fileName) => {
        if(!fileName) {
            return true
        }
        return (fileName.indexOf('.jpg') > -1 || fileName.indexOf('.jpeg') > -1 || fileName.indexOf('.webp') > -1);
    }

    showPreviousImage = () => {
        if(this.state.picIndex - 1 >= 0 && this.isImage(this.state.picList[this.state.picIndex -1])) {
            return (
                <img style={{...imgStyle, ...fadeOut}} src={this.state.picList[this.state.picIndex - 1]}/>
            )
        }
    }

    showNextImage = () => {
        if(this.state.picIndex + 1 <= this.state.picList.length && this.isImage(this.state.picList[this.state.picIndex + 1])) {
            return (
                <img style={{...imgStyle, ...hide}} src={this.state.picList[this.state.picIndex + 1]}/>
            )
        }
    }
    render() {
        const { picList, picIndex} = this.state;
        if(!picList.length) {
            return null;
        }

        const fileName = picList[picIndex];
        const isImage = this.isImage(fileName)
        

        let styling = imgStyle;
        if(this.state.addFade) {
            styling = {
                ...imgStyle,
                ...fadeOut
            }
        } else {
            styling = {
                ...imgStyle,
                ...fadeIn
            }
        }
        return (
            <div>
                {isImage ?
                (
                    <span>
                        <img style={styling} src={fileName} />
                        {this.showNextImage()}
                    </span>
                   
                )
                    : 
                    (
                        <span>
                        <video onPlay={this.handleVideoStart} onEnded={this.handleVideoEnd} style={styling} key={fileName} playsInline autoPlay muted>
                            <source src={fileName} type="video/mp4" />
                        </video>
                        {this.showNextImage()}
                        </span>
                    )
                }   
            </div>
        )
    }
}

export default Home;
