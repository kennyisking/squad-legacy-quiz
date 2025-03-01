
import { Player } from "../types/game";

// Mock data, in a real app this would be a comprehensive database of players from each season
export const players: Record<string, Player[]> = {
  "2018-19": [
    { id: "p1-1819", name: "Alisson", position: "GK", team: "Liverpool", season: "2018-19", points: 176, price: 5.5 },
    { id: "p2-1819", name: "Ederson", position: "GK", team: "Man City", season: "2018-19", points: 169, price: 5.5 },
    { id: "p3-1819", name: "Fabianski", position: "GK", team: "West Ham", season: "2018-19", points: 143, price: 4.5 },
    
    { id: "p4-1819", name: "Robertson", position: "DEF", team: "Liverpool", season: "2018-19", points: 213, price: 6.5 },
    { id: "p5-1819", name: "van Dijk", position: "DEF", team: "Liverpool", season: "2018-19", points: 208, price: 6.5 },
    { id: "p6-1819", name: "Alexander-Arnold", position: "DEF", team: "Liverpool", season: "2018-19", points: 185, price: 6.0 },
    { id: "p7-1819", name: "Laporte", position: "DEF", team: "Man City", season: "2018-19", points: 177, price: 6.0 },
    { id: "p8-1819", name: "Doherty", position: "DEF", team: "Wolves", season: "2018-19", points: 144, price: 5.0 },
    { id: "p9-1819", name: "Digne", position: "DEF", team: "Everton", season: "2018-19", points: 158, price: 5.5 },
    { id: "p10-1819", name: "Wan-Bissaka", position: "DEF", team: "Crystal Palace", season: "2018-19", points: 120, price: 4.5 },
    
    { id: "p11-1819", name: "Sterling", position: "MID", team: "Man City", season: "2018-19", points: 234, price: 11.0 },
    { id: "p12-1819", name: "Salah", position: "MID", team: "Liverpool", season: "2018-19", points: 259, price: 13.0 },
    { id: "p13-1819", name: "Hazard", position: "MID", team: "Chelsea", season: "2018-19", points: 238, price: 11.0 },
    { id: "p14-1819", name: "Mané", position: "MID", team: "Liverpool", season: "2018-19", points: 231, price: 10.5 },
    { id: "p15-1819", name: "Bernardo Silva", position: "MID", team: "Man City", season: "2018-19", points: 153, price: 7.5 },
    { id: "p16-1819", name: "Pogba", position: "MID", team: "Man United", season: "2018-19", points: 179, price: 8.5 },
    { id: "p17-1819", name: "Sigurdsson", position: "MID", team: "Everton", season: "2018-19", points: 182, price: 8.0 },
    { id: "p18-1819", name: "Eriksen", position: "MID", team: "Tottenham", season: "2018-19", points: 173, price: 9.0 },
    
    { id: "p19-1819", name: "Agüero", position: "FWD", team: "Man City", season: "2018-19", points: 201, price: 12.0 },
    { id: "p20-1819", name: "Aubameyang", position: "FWD", team: "Arsenal", season: "2018-19", points: 205, price: 11.0 },
    { id: "p21-1819", name: "Jiménez", position: "FWD", team: "Wolves", season: "2018-19", points: 181, price: 7.0 },
    { id: "p22-1819", name: "Vardy", position: "FWD", team: "Leicester", season: "2018-19", points: 174, price: 9.0 },
    { id: "p23-1819", name: "Wilson", position: "FWD", team: "Bournemouth", season: "2018-19", points: 168, price: 7.5 },
    { id: "p24-1819", name: "Firmino", position: "FWD", team: "Liverpool", season: "2018-19", points: 160, price: 9.5 },
  ],
  
  "2015-16": [
    { id: "p1-1516", name: "De Gea", position: "GK", team: "Man United", season: "2015-16", points: 142, price: 5.5 },
    { id: "p2-1516", name: "Schmeichel", position: "GK", team: "Leicester", season: "2015-16", points: 137, price: 4.5 },
    { id: "p3-1516", name: "Cech", position: "GK", team: "Arsenal", season: "2015-16", points: 135, price: 5.5 },
    
    { id: "p4-1516", name: "Bellerin", position: "DEF", team: "Arsenal", season: "2015-16", points: 172, price: 6.0 },
    { id: "p5-1516", name: "Alderweireld", position: "DEF", team: "Tottenham", season: "2015-16", points: 166, price: 6.5 },
    { id: "p6-1516", name: "Fuchs", position: "DEF", team: "Leicester", season: "2015-16", points: 142, price: 5.0 },
    { id: "p7-1516", name: "Morgan", position: "DEF", team: "Leicester", season: "2015-16", points: 149, price: 5.0 },
    { id: "p8-1516", name: "Monreal", position: "DEF", team: "Arsenal", season: "2015-16", points: 154, price: 5.5 },
    { id: "p9-1516", name: "Smalling", position: "DEF", team: "Man United", season: "2015-16", points: 140, price: 5.5 },
    { id: "p10-1516", name: "Walker", position: "DEF", team: "Tottenham", season: "2015-16", points: 143, price: 5.0 },
    
    { id: "p11-1516", name: "Mahrez", position: "MID", team: "Leicester", season: "2015-16", points: 240, price: 9.0 },
    { id: "p12-1516", name: "Özil", position: "MID", team: "Arsenal", season: "2015-16", points: 200, price: 9.5 },
    { id: "p13-1516", name: "Alli", position: "MID", team: "Tottenham", season: "2015-16", points: 182, price: 8.5 },
    { id: "p14-1516", name: "De Bruyne", position: "MID", team: "Man City", season: "2015-16", points: 171, price: 10.5 },
    { id: "p15-1516", name: "Payet", position: "MID", team: "West Ham", season: "2015-16", points: 171, price: 8.5 },
    { id: "p16-1516", name: "Kanté", position: "MID", team: "Leicester", season: "2015-16", points: 142, price: 5.0 },
    { id: "p17-1516", name: "Willian", position: "MID", team: "Chelsea", season: "2015-16", points: 161, price: 7.0 },
    { id: "p18-1516", name: "Arnautovic", position: "MID", team: "Stoke", season: "2015-16", points: 165, price: 7.5 },
    
    { id: "p19-1516", name: "Kane", position: "FWD", team: "Tottenham", season: "2015-16", points: 211, price: 10.5 },
    { id: "p20-1516", name: "Vardy", position: "FWD", team: "Leicester", season: "2015-16", points: 211, price: 7.5 },
    { id: "p21-1516", name: "Agüero", position: "FWD", team: "Man City", season: "2015-16", points: 184, price: 13.0 },
    { id: "p22-1516", name: "Lukaku", position: "FWD", team: "Everton", season: "2015-16", points: 185, price: 9.0 },
    { id: "p23-1516", name: "Ighalo", position: "FWD", team: "Watford", season: "2015-16", points: 175, price: 6.0 },
    { id: "p24-1516", name: "Giroud", position: "FWD", team: "Arsenal", season: "2015-16", points: 162, price: 9.0 },
  ],
  
  "2012-13": [
    // Add more seasons with similar structure
    { id: "p1-1213", name: "De Gea", position: "GK", team: "Man United", season: "2012-13", points: 132, price: 5.5 },
    { id: "p2-1213", name: "Mignolet", position: "GK", team: "Sunderland", season: "2012-13", points: 125, price: 4.5 },
    { id: "p3-1213", name: "Begovic", position: "GK", team: "Stoke", season: "2012-13", points: 135, price: 5.0 },
    
    { id: "p4-1213", name: "Baines", position: "DEF", team: "Everton", season: "2012-13", points: 178, price: 7.0 },
    { id: "p5-1213", name: "Vertonghen", position: "DEF", team: "Tottenham", season: "2012-13", points: 162, price: 6.0 },
    { id: "p6-1213", name: "Ivanovic", position: "DEF", team: "Chelsea", season: "2012-13", points: 145, price: 6.5 },
    { id: "p7-1213", name: "Zabaleta", position: "DEF", team: "Man City", season: "2012-13", points: 146, price: 6.0 },
    { id: "p8-1213", name: "Rafael", position: "DEF", team: "Man United", season: "2012-13", points: 154, price: 5.5 },
    { id: "p9-1213", name: "Enrique", position: "DEF", team: "Liverpool", season: "2012-13", points: 140, price: 5.5 },
    { id: "p10-1213", name: "Evans", position: "DEF", team: "Man United", season: "2012-13", points: 143, price: 5.0 },
    
    { id: "p11-1213", name: "Mata", position: "MID", team: "Chelsea", season: "2012-13", points: 212, price: 9.5 },
    { id: "p12-1213", name: "Cazorla", position: "MID", team: "Arsenal", season: "2012-13", points: 204, price: 9.0 },
    { id: "p13-1213", name: "Bale", position: "MID", team: "Tottenham", season: "2012-13", points: 249, price: 10.5 },
    { id: "p14-1213", name: "Gerrard", position: "MID", team: "Liverpool", season: "2012-13", points: 186, price: 9.5 },
    { id: "p15-1213", name: "Michu", position: "MID", team: "Swansea", season: "2012-13", points: 195, price: 7.5 },
    { id: "p16-1213", name: "Yaya Touré", position: "MID", team: "Man City", season: "2012-13", points: 175, price: 10.0 },
    { id: "p17-1213", name: "Hazard", position: "MID", team: "Chelsea", season: "2012-13", points: 190, price: 9.5 },
    { id: "p18-1213", name: "Walcott", position: "MID", team: "Arsenal", season: "2012-13", points: 195, price: 9.0 },
    
    { id: "p19-1213", name: "van Persie", position: "FWD", team: "Man United", season: "2012-13", points: 262, price: 14.0 },
    { id: "p20-1213", name: "Suárez", position: "FWD", team: "Liverpool", season: "2012-13", points: 205, price: 10.5 },
    { id: "p21-1213", name: "Agüero", position: "FWD", team: "Man City", season: "2012-13", points: 156, price: 11.0 },
    { id: "p22-1213", name: "Benteke", position: "FWD", team: "Aston Villa", season: "2012-13", points: 184, price: 7.0 },
    { id: "p23-1213", name: "Defoe", position: "FWD", team: "Tottenham", season: "2012-13", points: 155, price: 8.0 },
    { id: "p24-1213", name: "Berbatov", position: "FWD", team: "Fulham", season: "2012-13", points: 155, price: 7.5 },
  ],
  
  // Add more seasons with similar player structure
  "2009-10": [
    // Similar structure for 2009-10 season
    { id: "p1-0910", name: "Cech", position: "GK", team: "Chelsea", season: "2009-10", points: 170, price: 6.0 },
    // More players...
  ],
  
  "2003-04": [
    // Similar structure for the Invincibles season
    { id: "p1-0304", name: "Lehmann", position: "GK", team: "Arsenal", season: "2003-04", points: 165, price: 5.5 },
    // More players...
  ]
};
