
func main() {
	
}

// Should happen once at signup - this should happen in frontend React not in this service
func getAddressUprn() {
	
	url := "https://api.reading.gov.uk/api/rbc/getaddresses/" // {post code}
	// fetch json from url using post code
	// user is presented with drop down of addresses to select from
	// we then store the UPRN against them
}

//	ADDRESSES RESPONSE
// {
// 	"Addresses": [
// 	  {
// 		"SiteShortAddress": "1, NEWPORT ROAD, RG1 8EA", 
// 		"SiteAddressPrefix": "None", 
// 		"SiteAddress2": "NEWPORT ROAD", 
// 		"SiteLatitude": "51.463106616589684", 
// 		"SiteLongitude": "-0.977610277406597", 
// 		"SiteNorthing": "174290.0", 
// 		"SiteEasting": "471122.0",
// 		"AccountSiteUprn": "310021311", 
// 		"SiteId": "733", 
// 		"AccountSiteId": "12203"
// 	  },
// 	]
// }

func getCollectionsDataForUprn(uprn string) collections {
	url := "https://api.reading.gov.uk/api/collections/" // {uprn}
}

type collectionsResponse struct {
	uprn string
	success bool
	errorCode int
	errorDescription string
	collections []collections
}

type collections struct {
	service, round, schedule, date, readDate string
}

// 	SAMPLE BIN RESPONSE JSON
// {
// 	"uprn": "310021311", 
// 	"success": true, 
// 	"error_code": 0, 
// 	"error_description": "Success", 
// 	"collections": [
// 	  {
// 		"service": "Food Waste Collection Service", 
// 		"round": "FOOD2", 
// 		"schedule": "Mon", 
// 		"day": "Monday", 
// 		"date": "16/05/2022 00:00:00", 
// 		"read_date": "Monday 16th of May"
// 	  }, 
// 	]
// }
