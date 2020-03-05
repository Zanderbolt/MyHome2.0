import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../../models/food';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore'
import { map, take } from 'rxjs/operators'
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private foods : Observable<Food[]>;
  private foodCollection : AngularFirestoreCollection<Food>

  constructor(private afs: AngularFirestore) {
    //Define collection
    this.foodCollection = this.afs.collection<Food>('foods');
    //Get Collection Data
    this.foods = this.foodCollection.snapshotChanges().pipe(
      map (actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  //Get COLLECTION
  getFoods(): Observable<Food[]> {
    return this.foods;
  }

  //Get SingleFood
  getFood(id: string): Observable<Food> {
    return this.foodCollection.doc<Food>(id).valueChanges().pipe(
      take(1),
      map( food => {
        food.id = id;
        return food;
      })
    );
  }

  //Create New Food
  addFood(food: Food): Promise<DocumentReference> {
    console.log("ADD FOOD METHOD")
    return this.foodCollection.add(food);
  }

  //Update Food
  updateFood(food: Food): Promise<void> {
    return this.foodCollection.doc(food.id).update( {
      description: food.description,
      price: food.price,
      need: food.need
    });
  }

  //Delete Food
  deleteFood(id: string): Promise<void> {
    return this.foodCollection.doc(id).delete();
  }
}
