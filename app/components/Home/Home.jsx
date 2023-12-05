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

    videoInterval = null;

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
        clearInterval(this.videoInterval)
    }

    handleVideoStart = () => {
        clearInterval(this.interval);
        clearInterval(this.videoInterval)

        const progress = document.getElementById('progress');
        const video = document.getElementById('vid');
    
        this.videoInterval = setInterval(function () {
            progress.value = Math.round(
            (video.currentTime / video.duration) * 100 + 4
        );
        }, 200);
    }

    handleKeyUp = (e) => {
        if(e.which == 39) {
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

    getDate = (fileName) => {
        try {
            const dateStr = fileName.split('_')[0]
            
            const year   = dateStr.substring(0, 4);
            const month  = dateStr.substring(4, 6);
            const day    = dateStr.substring(6, 8);
            
            const abc = Date.parse(year+ '-' + month + '-' + day);
            
            return (new Date(abc)).toDateString()
        } catch (error) {
            return ''
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

        const date = this.getDate(fileName)
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
                        <video id="vid" onPlay={this.handleVideoStart} onEnded={this.handleVideoEnd} style={styling} key={fileName} playsInline autoPlay muted>
                            <source src={fileName} type="video/mp4" />
                        </video>
                        <span id="cont">
                        <figcaption>
                        <progress key={fileName + '1'} id="progress" max="100" value="0">Progress</progress>
                        </figcaption>
                            
                            </span>
                        {this.showNextImage()}
                        </span>
                    )
                }   
                {!!date && (
                    <div id='date'>
                        {date}
                    </div>
                )}
            </div>
        )
    }
}

export default Home;
