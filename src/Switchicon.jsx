import sun from "./sun.gif"
import clouds from "./clouds.gif"
import thunderstorm from "./thunderstorm.gif"
import drizzle from "./drizzle.gif"
import rain from "./rain.gif"
import snow from "./snow.gif"
import foggy from "./foggy.gif"
import tornado from "./tornado.gif"
import wind from "./wind.gif"
import thunder from "./thunder.gif"
import night from "./night.gif"

const getIcon = (weather,subweather,currentHour) =>{
    switch(weather) {
        case "Thunderstorm":
            switch(subweather) {
                case "light thunderstorm":
                    return thunder
                    break;

                case "thunderstorm":
                    return thunder
                    break;

                case "heavy thunderstorm":
                    return thunder
                    break;

                case "ragged thunderstorm":
                    return thunder
                    break;

                default:
                    return thunderstorm
                    break;     
            }
            break;
        
        case "Drizzle":
            return drizzle
            break;
            
        case "Rain":
            return rain
            break;
            
        case "Snow":
            return snow
            break;
        
        case "Mist":
            return foggy
            break;
            
        case "Smoke":
            return foggy
            break;  
        
        case "Haze":
            return foggy
            break;
            
        case "Dust":
            return foggy
            break;
          
        case "Ash":
            return foggy
            break;

        case "Squall":
            return wind
            break;

        case "Tornado":
            return tornado
            break;

        case "Clear":
            switch(currentHour){
                case 0: 
                case 1: 
                case 2: 
                case 3: 
                case 4:  
                    return night
                    break;

                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10: 
                case 11:
                case 12: 
                case 13: 
                case 14: 
                case 15: 
                case 16: 
                case 17: 
                case 18:
                    return sun
                    break;
                
                case 19: 
                case 20: 
                case 21: 
                case 22: 
                case 23:
                    return night
                    break;        
            }
            break;

        case "Clouds":
            return clouds
            break;
    }
    
}

export default getIcon;