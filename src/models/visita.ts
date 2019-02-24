export class Visita 
{
    public ClientId: number;
    public FirstName: string;        
    public LastName: string;
    public LegalName: string;
    public Address: string;
    public Phone: string;
    public Mobile: string;
    public Email: string;                 
    public Latitude: number;
    public Longitude: number;
    public ClientObservation: string;
    public VisitObservation;
    public NextVisitDate: Date;
    public NextVisitObservation: string;
    public UserId: number;
    public OrderDeliveryDate: Date;
    public items: any[]; 

    constructor()
    {
        
    }
   
}